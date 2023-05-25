import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromReducer from '@state/memo-row/memo-row.reducer';
import * as fromSelectors from '@state/memo-row/memo-row.selectors';

@Injectable({
  providedIn: 'root',
})
export class MemoRowFacade {
  constructor(private store: Store<fromReducer.MemoRowState>) {}

  memoRows$ = this.store.pipe(select(fromSelectors.selectAll()));
  isLoading$ = this.store.pipe(select(fromSelectors.selectIsLoading()));
}
