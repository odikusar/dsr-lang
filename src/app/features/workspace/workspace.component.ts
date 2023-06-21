import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MemoFileFacade } from '@app/store/memo-file';
import { MemoRowFacade } from '@app/store/memo-row';
import { UserFacade } from '@app/store/user';

@Component({
  selector: 'dsr-workspace',
  templateUrl: './workspace.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent {
  memoFiles$ = this.memoFileFacade.loadAll();
  activeMemoFileId$ = this.userFacade.activeMemoFileId$;
  isTranslationByDefault$ = this.userFacade.isTranslationByDefault$;
  isDemoUser$ = this.userFacade.isDemo$;
  memoRows$ = this.memoRowFacade.memoRows$;
  selectedFreshMemoRows$ = this.memoRowFacade.selectedFreshMemoRows$;
  isPreviousMemoRowShown$ = this.memoRowFacade.isPreviousMemoRowShown$;
  memoRow$ = this.memoRowFacade.memoRow$;
  isPreviousMemoRowReady$ = this.memoRowFacade.isPreviousMemoRowReady$;
  isAnswerDisplayed$ = this.memoRowFacade.isAnswerDisplayed$;
  rowsLeftCount$ = this.memoRowFacade.rowsLeftCount$;

  constructor(
    private memoFileFacade: MemoFileFacade,
    private memoRowFacade: MemoRowFacade,
    private userFacade: UserFacade
  ) {}
}
