import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorFormHandlerComponent} from './error-form-handler/error-form-handler';
import {FormComponent} from './form/form/form.component';
import {ImagePickerComponent} from './form/image-picker/image-picker.component';
import {InputPatternPipe} from './form/input-pattern.pipe';
import {InputTypePipe} from './form/input-type.pipe';
import {GetZoneFromLocationPipe} from './form/get-zone-from-location.pipe';
import {LocationComponent} from './form/location/location.component';
import {RecapComponent} from './form/recap/recap.component';
import {SelectComponent} from './form/select/select.component';
import {FormEffects} from './form/state/form.effects';
import * as fromForm from './form/state/form.reducer';
import {SignUpEffects} from './form/state/sign-up.effects';
import * as fromSignUp from './form/state/sign-up.reducer';
import {firstStepSignupComponent} from './form/steps/first-step.component';
import {secondStepSignupComponent} from './form/steps/second-step.component';
import {thirdStepComponent} from './form/steps/third-step.component';
import {HeaderComponent} from './header/header.component';
import {HeaderEffects} from './header/state/header.effects';
import * as fromHeader from './header/state/header.reducer';
import {MapComponent} from './map/map.component';
import {MenuComponent} from './menu/menu.component';
import {PapDatePipe} from './pipes/pap-date.pipe';
import {BroadcastNotificationService} from './services/broadcast-notification.service';
import {LocalNotificationService} from './services/local-notification.service';
import {FooterComponent} from './footer/footer.component';
import {FormStatusComponent} from './form/status/status.component';
import {LocationModalComponent} from './form/location/location.modal';
import {CalendarSelectComponent} from './form/calendar-select/calendar-select.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {SortPipe} from './pipes/sort.pipe';
import {FilterByPipe} from './pipes/filter-by.pipe';
import {thirdStepSignupComponent} from './form/steps/third-step-signup.component';
import {PapLangPipe} from './pipes/pap-lang.pipe';
import {PapTicketPipe} from './pipes/pap-ticket.pipe';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ErrorFormHandlerComponent,
    MapComponent,
    InputTypePipe,
    InputPatternPipe,
    PapTicketPipe,
    FormComponent,
    firstStepSignupComponent,
    secondStepSignupComponent,
    thirdStepComponent,
    thirdStepSignupComponent,
    LocationComponent,
    LocationModalComponent,
    FormStatusComponent,
    RecapComponent,
    ImagePickerComponent,
    SelectComponent,
    PapDatePipe,
    PapLangPipe,
    SortPipe,
    FilterByPipe,
    GetZoneFromLocationPipe,
    CalendarSelectComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    HttpClientModule,
    StoreModule.forFeature(fromHeader.headerFeatureKey, fromHeader.reducer),
    EffectsModule.forFeature([HeaderEffects]),
    StoreModule.forFeature(fromForm.ticketFeatureKey, fromForm.reducer),
    EffectsModule.forFeature([FormEffects]),
    StoreModule.forFeature(fromSignUp.signUpFeatureKey, fromSignUp.reducer),
    EffectsModule.forFeature([SignUpEffects]),
    TranslateModule.forRoot(),
  ],
  providers: [LocalNotificationService, BroadcastNotificationService],
  exports: [
    CommonModule,
    FooterComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    HeaderComponent,
    MapComponent,
    MenuComponent,
    ErrorFormHandlerComponent,
    TranslateModule,
    InputTypePipe,
    InputPatternPipe,
    PapTicketPipe,
    FormComponent,
    LocationComponent,
    RecapComponent,
    FormStatusComponent,
    ImagePickerComponent,
    SelectComponent,
    PapDatePipe,
    PapLangPipe,
    FilterByPipe,
    SortPipe,
    firstStepSignupComponent,
    secondStepSignupComponent,
    thirdStepComponent,
    thirdStepSignupComponent,
    GetZoneFromLocationPipe,
    CalendarSelectComponent,
    CalendarComponent,
    LocationModalComponent,
  ],
})
export class SharedModule {}
