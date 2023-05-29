import { MemoFile } from '@models/memo-file.model';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const loadAll = createAction('[MemoFile] Load All');

export const loadAllSuccess = createAction(
  '[MemoFile] Load All Success',
  props<{ payload: MemoFile[] }>()
);

export const loadAllFail = createAction('[MemoFile] Load All Fail', props<{ error: Error }>());

export const create = createAction('[MemoFile] Create', props<{ payload: Partial<MemoFile> }>());

export const createSuccess = createAction(
  '[MemoFile] Create Success',
  props<{ payload: MemoFile }>()
);

export const createFail = createAction('[MemoFile] Create Fail', props<{ error: Error }>());

export const update = createAction('[MemoFile] Update', props<{ payload: Update<MemoFile> }>());

export const updateSuccess = createAction(
  '[MemoFile] Update Success',
  props<{ payload: Update<MemoFile> }>()
);

export const updateFail = createAction('[MemoFile] Update Fail', props<{ error: Error }>());

export const deleteOne = createAction('[MemoFile] Delete One', props<{ id: string }>());

export const deleteOneSuccess = createAction(
  '[MemoFile] Delete One Success',
  props<{ id: string }>()
);

export const deleteOneFail = createAction('[MemoFile] Delete One Fail', props<{ error: Error }>());
