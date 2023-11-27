import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {InAppBrowser} from '@awesome-cordova-plugins/in-app-browser/ngx';
import {ModalController} from '@ionic/angular';
import {Store, select} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {AppState} from '../../core/core.state';
import {showButtons} from '../../shared/header/state/header.actions';
import {loadTrashBooks, setTrashBookType} from '../trash-book/state/trash-book.actions';
import {TrashBookType} from '../trash-book/trash-book-model';
import {TrashBookTypeComponent} from '../trash-book/trash-book-type/trash-book-type.component';
import {Calendar} from './calendar.model';
import {loadCalendars} from './state/calendar.actions';
import {selectCalendarState} from './state/calendar.selectors';
import {environment} from 'projects/pap/src/environments/environment';

@Component({
  selector: 'pap-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarPageComponent {
  @ViewChild('popover') popover: any;

  calendarView$ = this._store.pipe(select(selectCalendarState));
  currentAddress$: BehaviorSubject<Calendar | null> = new BehaviorSubject<Calendar | null>(null);
  isOpen = false;

  constructor(
    private _store: Store<AppState>,
    private _modalController: ModalController,
    private _inAppBrowser: InAppBrowser,
  ) {
    this._store.dispatch(loadTrashBooks());
    this._store.dispatch(loadCalendars());
    this._store.dispatch(showButtons({show: false}));
    this.calendarView$.pipe(filter(f => f != null)).subscribe(calendarView => {
      if (calendarView != null && calendarView.calendars != null) {
        this.currentAddress$.next(calendarView.calendars[0]);
      }
    });
  }

  info(tbType: TrashBookType): void {
    this._store.dispatch(setTrashBookType({trashBookType: tbType}));
    this._modalController
      .create({
        component: TrashBookTypeComponent,
        showBackdrop: true,
        componentProps: {trashBookType: tbType},
      })
      .then(modal => modal.present());
  }

  openLink(): void {
    this._inAppBrowser.create(this._getOtherInfoUrl());
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  selectPopoverAddress(index: number) {
    this.calendarView$
      .pipe(
        filter(f => f != null),
        take(1),
      )
      .subscribe(calendarView => {
        if (calendarView && calendarView.calendars) {
          this.currentAddress$.next(calendarView.calendars[index]);
          this.isOpen = false;
        }
      });
  }

  private _getOtherInfoUrl(): string {
    let otherInfoUrl = environment.config.resources?.other_info_url ?? '';
    const currentAddress = this.currentAddress$.value;
    if (
      currentAddress != null &&
      currentAddress.address != null &&
      currentAddress.address.zone != null &&
      currentAddress.address.zone.url != null
    ) {
      otherInfoUrl = currentAddress.address.zone.url;
    }
    return otherInfoUrl;
  }
}
