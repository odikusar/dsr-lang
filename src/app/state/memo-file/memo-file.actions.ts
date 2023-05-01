import { MemoFile } from '@models/memo-file.model';
import { createAction, props } from '@ngrx/store';

export const loadAll = createAction('[MemoFile] Load All');

export const loadAllSuccess = createAction(
  '[MemoFile] Load All Success',
  props<{ payload: MemoFile[] }>()
);

export const loadAllFail = createAction('[MemoFile] Load All Fail', props<{ error: Error }>());
