import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DEDUCTION_COEFFICIENT, ROWS_PER_PAGE, START_ROW_INDEX } from '@app/constants';
import { MemoService } from '@app/services/memo.service';
import { MemoRowFacade } from '@state/memo-row';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

interface PaginationForm {
  from: FormControl<number>;
  to: FormControl<number>;
  checkAllPages: FormControl<boolean>;
  withFlag: FormControl<boolean>;
  pages: FormArray<FormControl<boolean>>;
}

@Component({
  selector: 'dsr-workspace-pagination',
  templateUrl: './workspace-pagination.component.html',
  styleUrls: ['./workspace-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspacePaginationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rowsTotalCount: number;
  @Input() rowsLeftCount: number;
  @Input() currentMemoRowId: number;

  DEDUCTION_COEFFICIENT = DEDUCTION_COEFFICIENT;
  fromRowNumber$: BehaviorSubject<number> = new BehaviorSubject(1);
  toRowNumber$: BehaviorSubject<number> = new BehaviorSubject(1);

  private onDestroy$: Subject<void> = new Subject();
  private readonly numbersValidation = Validators.pattern('^[0-9]*$');

  form = this.fb.group<PaginationForm>({
    from: this.fb.control<number>(START_ROW_INDEX, [Validators.required, this.numbersValidation]),
    to: this.fb.control<number>(START_ROW_INDEX, [Validators.required, this.numbersValidation]),
    pages: this.fb.array<FormControl<boolean>>([]),
    checkAllPages: this.fb.control<boolean>(false),
    withFlag: this.fb.control<boolean>(false),
  });

  constructor(
    private fb: FormBuilder,
    private memoService: MemoService,
    private memoRowFacade: MemoRowFacade
  ) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged(), takeUntil(this.onDestroy$))
      .subscribe((formValue) => {
        const selectedRowsIndexes = this.memoService.getSelectedRowsIndexes(
          this.getSelectedPages(formValue.pages),
          formValue.from - 1,
          formValue.to - 1,
          ROWS_PER_PAGE
        );

        this.memoRowFacade.setSelection(selectedRowsIndexes, formValue.withFlag);
      });

    this.form.controls.checkAllPages.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((checkAllPages) => {
        this.form.controls.pages.patchValue(new Array(this.pagesCount).fill(checkAllPages));
      });

    this.form.controls.pages.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((pages) => {
      const isAllPagesChecked = pages.every((item) => item === true);

      this.form.controls.checkAllPages.patchValue(isAllPagesChecked, {
        emitEvent: false,
      });

      const selectedPages = this.getSelectedPages(pages);

      if (selectedPages.length) {
        const boundaryIndexes = this.memoService.getBoundaryRowsIndexes(
          selectedPages,
          this.rowsTotalCount,
          ROWS_PER_PAGE
        );

        const fromRowNumber = boundaryIndexes.firstRowIndex + 1;
        const toRowNumber = boundaryIndexes.lastRowIndex + 1;

        this.form.patchValue(
          { from: fromRowNumber, to: toRowNumber },
          {
            emitEvent: false,
          }
        );

        const rowsLimitValidation = [Validators.min(fromRowNumber), Validators.max(toRowNumber)];

        this.fromRowNumber$.next(fromRowNumber);
        this.toRowNumber$.next(toRowNumber);

        this.form.controls.from.setValidators(rowsLimitValidation);
        this.form.controls.to.setValidators(rowsLimitValidation);
      }
    });

    // this.ticketForm.patchValue(ticket, {emitEvent: false, onlySelf: true});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['rowsTotalCount']) {
      this.form.controls.pages.clear({ emitEvent: false });

      if (this.rowsTotalCount > 0) {
        for (let i = 0; i < this.pagesCount; i++) {
          this.form.controls.pages.push(this.fb.control<boolean>(true), { emitEvent: false });
        }
        this.form.controls.pages.updateValueAndValidity();
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  get lastTotalRowIndex(): number {
    return this.rowsTotalCount - 1 || 0;
  }

  get pagesCount(): number {
    return this.rowsTotalCount < ROWS_PER_PAGE ? 1 : Math.ceil(this.rowsTotalCount / ROWS_PER_PAGE);
  }

  private getSelectedPages(checkedPages: boolean[]): number[] {
    return checkedPages.reduce((out, value, index) => (!!value ? out.concat(index) : out), []);
  }

  addUpRows() {
    this.form.patchValue({
      from: this.form.controls.from.value + DEDUCTION_COEFFICIENT,
    });
  }

  deductRows() {
    this.form.patchValue({
      to: this.form.controls.to.value - DEDUCTION_COEFFICIENT,
    });
  }
}
