import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
//import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MenubarComponent } from './menubar/menubar.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { FaqComponent } from './faq/faq.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoutComponent } from './logout/logout.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AppComponent, LoginComponent, RegistrationComponent, DashboardComponent, HomeComponent, MenubarComponent, FooterComponent, EmployeeProfileComponent, FaqComponent, FeedbackComponent, NavbarComponent, LogoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    //  NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
