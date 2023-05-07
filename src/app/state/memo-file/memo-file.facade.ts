import { Injectable } from '@angular/core';
import { MemoFile } from '@app/models';
import { Store, select } from '@ngrx/store';
import * as fromActions from '@state/memo-file/memo-file.actions';
import * as fromReducer from '@state/memo-file/memo-file.reducer';
import * as fromSelectors from '@state/memo-file/memo-file.selectors';
import { Observable, filter, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemoFileFacade {
  constructor(private store: Store<fromReducer.MemoFileState>) {}

  memoFiles$ = this.store.pipe(select(fromSelectors.selectAll()));
  isLoading$ = this.store.pipe(select(fromSelectors.selectIsLoading()));
  selectedId$ = this.store.pipe(select(fromSelectors.selectSelectedId()));

  loadAll(isBypassCache = false): Observable<MemoFile[]> {
    this.store
      .select(fromSelectors.selectIsAllLoaded())
      .pipe(
        take(1),
        filter((isAllLoaded) => !isAllLoaded || isBypassCache)
      )
      .subscribe(() => this.store.dispatch(fromActions.loadAll()));

    return this.memoFiles$;
  }

  create(memoFile: Partial<MemoFile>): void {
    this.store.dispatch(fromActions.create({ payload: memoFile }));
  }

  update(memoFile: Partial<MemoFile>): void {
    this.store.dispatch(fromActions.update({ payload: { id: memoFile.id, changes: memoFile } }));
  }

  delete(memoFileId: string): void {
    this.store.dispatch(fromActions.deleteOne({ id: memoFileId }));
  }

  select(memoFileId: string): void {
    this.store.dispatch(fromActions.selectOne({ id: memoFileId }));
  }
}
