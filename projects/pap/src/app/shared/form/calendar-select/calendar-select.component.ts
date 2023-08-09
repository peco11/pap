import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {TrashBookType} from '../../../features/trash-book/trash-book-model';
import {Calendar} from '../../../features/calendar/calendar.model';

@Component({
  selector: 'pap-form-calendar-select',
  templateUrl: './calendar-select.component.html',
  styleUrls: ['./calendar-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CalendarSelectComponent,
    },
  ],
})
export class CalendarSelectComponent implements ControlValueAccessor {
  @Input() calendars: Calendar[];

  currentTrashType: TrashBookType;
  disabled = false;
  onChange = (select: {trashDate: string; tbType: TrashBookType; calendar: Calendar}) => {};
  onTouched = () => {};
  options$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  select: {trashDate: string; tbType: TrashBookType; calendar: Calendar} | null = null;
  touched = false;
  public calendarForm: FormGroup = new FormGroup({
    calendar: new FormControl(null, [Validators.required]),
    tbType: new FormControl(null, [Validators.required]),
    trashDate: new FormControl('', [Validators.required]),
  });
  constructor(private _cdr: ChangeDetectorRef) {}

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
    this.calendarForm.valueChanges.subscribe(onChange);
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  writeValue(obj: {trashDate: string; tbType: TrashBookType; calendar: Calendar}): void {
    if ((obj as any) != '') {
      this.calendarForm.setValue(obj);
      this._cdr.detectChanges();
    }
  }
}
