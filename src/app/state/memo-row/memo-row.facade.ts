import { Injectable } from '@angular/core';
import { MemoService } from '@app/services/memo.service';
import { Store, select } from '@ngrx/store';
import * as fromActions from '@state/memo-row/memo-row.actions';
import * as fromReducer from '@state/memo-row/memo-row.reducer';
import * as fromSelectors from '@state/memo-row/memo-row.selectors';
import { BehaviorSubject, combineLatest, filter, map, mergeMap, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemoRowFacade {
  constructor(private store: Store<fromReducer.MemoRowState>, private memoService: MemoService) {}
  memoRows$ = this.store.pipe(select(fromSelectors.selectAll()));
  isLoading$ = this.store.pipe(select(fromSelectors.selectIsLoading()));
  selectedFreshMemoRows$ = this.store.pipe(select(fromSelectors.selectAllFreshInSelection()));
  previousMemoRow$ = this.store.pipe(select(fromSelectors.selectPreviousMemoRow()));
  isPreviousMemoRowShown$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAnswerDisplayed$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isPreviousMemoRowReady$ = combineLatest(
    [this.previousMemoRow$, this.isPreviousMemoRowShown$],
    (previousMemoRow, isPreviousMemoRowShown) => !!previousMemoRow && !isPreviousMemoRowShown
  );
  randomMemoRow$ = this.selectedFreshMemoRows$.pipe(
    filter((memoRows) => !!memoRows && !!memoRows.length),
    map((memoRows) => this.memoService.getRandomMemoRow(memoRows)),
    shareReplay()
  );
  memoRow$ = this.isPreviousMemoRowShown$.pipe(
    mergeMap((isPreviousMemoRowShown: boolean) =>
      isPreviousMemoRowShown ? this.previousMemoRow$ : this.randomMemoRow$
    )
  );
  rowsLeftCount$ = this.selectedFreshMemoRows$.pipe(
    map((memoRows) => (memoRows?.length > 0 ? memoRows?.length - 1 : 0))
  );

  setSelection(selectedRowsIndexes: number[], withFlag: boolean): void {
    this.store.dispatch(fromActions.setSelection({ payload: { selectedRowsIndexes, withFlag } }));
  }

  reset(): void {
    this.store.dispatch(fromActions.reset());
  }

  setShown(id: number): void {
    this.store.dispatch(fromActions.setShown({ id }));
    this.isPreviousMemoRowShown$.next(false);
  }

  showPrevious(): void {
    this.isPreviousMemoRowShown$.next(true);
  }
}
