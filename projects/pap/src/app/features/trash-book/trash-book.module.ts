import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrashBookRoutingModule} from './trash-book-routing.module';
import {TrashBookComponent} from './trash-book.component';
import {StoreModule} from '@ngrx/store';
import * as fromTrashBook from './state/trash-book.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TrashBookEffects} from './state/trash-book.effects';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [TrashBookComponent],
  imports: [
    CommonModule,
    SharedModule,
    TrashBookRoutingModule,
    StoreModule.forFeature(fromTrashBook.trashBookFeatureKey, fromTrashBook.reducer),
    EffectsModule.forFeature([TrashBookEffects]),
  ],
})
export class TrashBookModule {}
