import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DICTIONARY_LINK, EXPLANATION_LINK, GOOGLE_IMAGE_LINK } from '@app/constants';
import { MemoRowFacade } from '@app/store/memo-row';
import { UserFacade } from '@app/store/user';
import { MemoRow } from '@models/memo-row.model';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'dsr-workspace-controls',
  templateUrl: './workspace-controls.component.html',
  styleUrls: ['./workspace-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceControlsComponent implements OnInit, OnDestroy {
  @Input() memoRow: MemoRow;
  @Input() isPreviousMemoRowReady: boolean;
  @Input() isTranslationByDefault: boolean;
  @Input() rowsLeftCount: number;

  private onDestroy$: Subject<void> = new Subject();

  isTranslationByDefaultCtrl = new FormControl<boolean>(null);

  constructor(
    private memoRowFacade: MemoRowFacade,
    private userFacade: UserFacade,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isTranslationByDefaultCtrl.setValue(this.isTranslationByDefault);

    this.isTranslationByDefaultCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value) => {
        this.userFacade.updateSettings({ isTranslationByDefault: value });
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  showNext(): void {
    if (!this.rowsLeftCount) {
      return;
    }

    this.memoRowFacade.isAnswerDisplayed$.next(false);
    this.memoRowFacade.setShown(this.memoRow.id);
  }

  showPrevious(): void {
    this.memoRowFacade.showPrevious();
  }

  showAnswer(): void {
    this.memoRowFacade.isAnswerDisplayed$.next(true);
    if (this.rowsLeftCount === 0) {
      this.toastr.success("Congrats that's all");
    }
  }

  reset(): void {
    this.memoRowFacade.isAnswerDisplayed$.next(false);
    this.memoRowFacade.reset();
  }

  openDictionary(): void {
    this.openInNewTab(`${DICTIONARY_LINK}${this.memoRow.word}`);
  }

  openExplanation(): void {
    this.openInNewTab(`${EXPLANATION_LINK}${this.memoRow.word}`);
  }

  openImage(): void {
    this.openInNewTab(`${GOOGLE_IMAGE_LINK}${this.memoRow.word}`);
  }

  private openInNewTab(href: string): void {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      href,
    }).click();
  }
}
