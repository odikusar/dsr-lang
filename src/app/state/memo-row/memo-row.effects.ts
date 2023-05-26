import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FLAG_INDEX, TRANSLATE_INDEX, WORD_INDEX } from '@app/constants';
import { MemoRow } from '@models/index';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import * as fromMemoFileReducer from '@state/memo-file/memo-file.reducer';
import * as fromMemoFileSelectors from '@state/memo-file/memo-file.selectors';
import * as fromUserReducer from '@state/user/user.reducer';
import * as fromUserSelectors from '@state/user/user.selectors';
import { NgxCsvParser } from 'ngx-csv-parser';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import * as fromActions from './memo-row.actions';

@Injectable()
export class MemoRowEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private ngxCsvParser: NgxCsvParser,
    private memoFileStore: Store<fromMemoFileReducer.MemoFileState>,
    private authStore: Store<fromUserReducer.UserState>
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadAll),
      switchMap(() => this.authStore.pipe(select(fromUserSelectors.selectActiveMemoFileId()))),
      switchMap((activeMemoFileId) =>
        this.memoFileStore.pipe(select(fromMemoFileSelectors.selectById(activeMemoFileId)))
      ),
      filter((memoFile) => !!memoFile),
      switchMap((memoFile) =>
        this.http.get(memoFile.url, { responseType: 'text' }).pipe(
          map((memoData) => this.ngxCsvParser.csvStringToArray(memoData, ',')),
          map((items) =>
            items.map(
              (item, index) =>
                ({
                  id: index,
                  word: item[WORD_INDEX],
                  translate: item[TRANSLATE_INDEX],
                  flag: item[FLAG_INDEX],
                  isShown: false,
                  isSelected: false,
                } as MemoRow)
            )
          ),
          map((memoRows) => {
            const lastRow = memoRows.slice(-1)[0];

            if (!lastRow.word) {
              memoRows.pop();
            }

            return memoRows as MemoRow[];
          }),
          map((memoRows) => fromActions.loadAllSuccess({ payload: memoRows })),
          catchError((error) => of(fromActions.loadAllFail({ error })))
        )
      )
    )
  );
}
