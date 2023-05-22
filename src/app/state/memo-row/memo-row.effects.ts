import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FireApiService } from '@app/services/fire-api.service';
import { MemoRow } from '@models/index';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxCsvParser } from 'ngx-csv-parser';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromActions from './memo-row.actions';

@Injectable()
export class MemoRowEffects {
  constructor(
    private actions$: Actions,
    private fireApi: FireApiService,
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    private ngxCsvParser: NgxCsvParser
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadAll),
      switchMap(({ payload }) =>
        this.http.get(payload.url, { responseType: 'text' }).pipe(
          map((memoData) => this.ngxCsvParser.csvStringToArray(memoData, ',')),
          map((items) =>
            items.map(
              (item, index) =>
                ({
                  id: index + 1,
                  word: item[0],
                  translate: item[1],
                  flag: item[2],
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
