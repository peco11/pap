import {NgModule} from '@angular/core';
import {SignUpRoutingModule} from './sign-up-routing.module';
import {SignUpComponent} from './sign-up.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [SharedModule, SignUpRoutingModule],
})
export class SignUpModule {}
