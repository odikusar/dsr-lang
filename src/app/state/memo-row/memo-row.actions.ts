import { MemoRow } from '@models/memo-row.model';
import { createAction, props } from '@ngrx/store';

export const loadAll = createAction('[MemoRow] Load All');

export const loadAllSuccess = createAction(
  '[MemoRow] Load All Success',
  props<{ payload: MemoRow[] }>()
);

export const loadAllFail = createAction('[MemoRow] Load All Fail', props<{ error: Error }>());
