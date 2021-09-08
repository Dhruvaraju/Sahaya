import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login1Component } from './login1/login1.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:'',component:Login1Component},
   {path:'register',component:RegistrationComponent},
  
  {path:'login1', component:Login1Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
