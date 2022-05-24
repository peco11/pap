import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTrashBook from './trash-book.reducer';

export const selectTrashBookState = createFeatureSelector<fromTrashBook.TrashBookState>(
  fromTrashBook.trashBookFeatureKey,
);
export const selectedTrashBookDetail = createSelector(
  selectTrashBookState,
  state => state.trashBookDetail,
);