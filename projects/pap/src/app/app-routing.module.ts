import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full', // if no route redirect to home
  },
  {path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
  {
    path: 'trashbook',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/trash-book/trash-book.module').then(m => m.TrashBookModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
  },
  {path: 'info', loadChildren: () => import('./features/info/info.module').then(m => m.InfoModule)},
  {
    path: 'sign-in',
    loadChildren: () => import('./features/sign-in/sign-in.module').then(m => m.SignInModule),
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./features/sign-up/sign-up.module').then(m => m.SignUpModule),
  },
  {
    path: 'waste-center-collection',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/waste-center-collection/waste-center-collection.module').then(
        m => m.WasteCenterCollectionModule,
      ),
  },
  {
    path: 'info-ticket',
    loadChildren: () =>
      import('./features/info-ticket/info-ticket.module').then(m => m.InfoTicketModule),
  },
  {
    path: 'ticket-reservation',
    loadChildren: () =>
      import('./features/ticket-reservation/ticket-reservation.module').then(
        m => m.TicketReservationModule,
      ),
  },
  {
    path: 'abandonment-ticket',
    loadChildren: () =>
      import('./features/abandonment-ticket/abandonment-ticket.module').then(
        m => m.AbandonmentTicketModule,
      ),
  },
  {
    path: 'report-ticket',
    loadChildren: () =>
      import('./features/report-ticket/report-ticket.module').then(m => m.ReportTicketModule),
  },
  { path: 'calendar', loadChildren: () => import('./features/calendar/calendar.module').then(m => m.CalendarModule) },
  {
    path: '**',
    redirectTo: 'home', // all no defined route redirect to home
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
