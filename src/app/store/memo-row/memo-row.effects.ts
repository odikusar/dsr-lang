import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FLAG_INDEX, TRANSLATE_INDEX, WORD_INDEX } from '@app/constants';
import * as fromMemoFileReducer from '@app/store/memo-file/memo-file.reducer';
import * as fromMemoFileSelectors from '@app/store/memo-file/memo-file.selectors';
import * as fromUserReducer from '@app/store/user/user.reducer';
import * as fromUserSelectors from '@app/store/user/user.selectors';
import { MemoRow } from '@models/index';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromActions from './memo-row.actions';

@Injectable()
export class MemoRowEffects {
  private loader = this.loadingBar.useRef();

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private ngxCsvParser: NgxCsvParser,
    private memoFileStore: Store<fromMemoFileReducer.MemoFileState>,
    private authStore: Store<fromUserReducer.UserState>,
    private loadingBar: LoadingBarService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadAll),
      switchMap(() =>
        this.authStore.pipe(take(1), select(fromUserSelectors.selectActiveMemoFileId()))
      ),
      switchMap((activeMemoFileId) =>
        this.memoFileStore.pipe(take(1), select(fromMemoFileSelectors.selectById(activeMemoFileId)))
      ),
      filter((memoFile) => !!memoFile),
      tap(() => this.loader.start()),
      switchMap((memoFile) =>
        this.http.get(memoFile.url, { responseType: 'text' }).pipe(
          map((memoData) => this.ngxCsvParser.csvStringToArray(memoData, ',')),
          map((items) =>
            items
              .filter((item) => !!item[WORD_INDEX] && !!item[TRANSLATE_INDEX])
              .map(
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
          tap(() => this.loader.complete()),
          map((memoRows) => fromActions.loadAllSuccess({ payload: memoRows })),
          catchError((error) => of(fromActions.loadAllFail({ error })))
        )
      )
    )
  );
}
