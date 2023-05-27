import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MemoFileFacade } from '@state/memo-file';
import * as fromMemoFileActions from '@state/memo-file/memo-file.actions';
import { MemoRowFacade } from '@state/memo-row';
import { UserFacade } from '@state/user';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'dsr-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent implements OnInit {
  private loader = this.loadingBar.useRef();
  private onDestroy$: Subject<void> = new Subject();

  memoFiles$ = this.memoFileFacade.loadAll();
  activeMemoFileId$ = this.userFacade.activeMemoFileId$;
  isTranslationByDefault$ = this.userFacade.isTranslationByDefault$;
  isDemoUser$ = this.userFacade.isDemo$;
  memoRows$ = this.memoRowFacade.memoRows$;
  selectedFreshMemoRows$ = this.memoRowFacade.selectedFreshMemoRows$;
  randomMemoRow$ = this.memoRowFacade.randomMemoRow$;
  isPreviousMemoRowShown$ = this.memoRowFacade.isPreviousMemoRowShown$;
  memoRow$ = this.memoRowFacade.memoRow$;
  isPreviousMemoRowReady$ = this.memoRowFacade.isPreviousMemoRowReady$;
  isAnswerDisplayed$ = this.memoRowFacade.isAnswerDisplayed$;
  rowsLeftCount$ = this.memoRowFacade.rowsLeftCount$;

  constructor(
    private memoFileFacade: MemoFileFacade,
    private memoRowFacade: MemoRowFacade,
    private loadingBar: LoadingBarService,
    private actions$: Actions,
    private userFacade: UserFacade
  ) {}

  ngOnInit(): void {
    this.handleLoader();
  }

  private handleLoader(): void {
    this.loader.start();

    this.actions$
      .pipe(
        ofType(
          fromMemoFileActions.loadAllSuccess,
          fromMemoFileActions.loadAllFail,
          fromMemoFileActions.createFail,
          fromMemoFileActions.createSuccess
        ),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => this.loader.complete());
  }
}
