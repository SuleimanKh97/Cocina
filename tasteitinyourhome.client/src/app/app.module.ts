import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaraComponent } from './Sara/sara/sara.component';
import { SofyanComponent } from './Sofyan/sofyan/sofyan.component';
import { SondosComponent } from './Sondos/sondos/sondos.component';
import { SuleimanComponent } from './Suleiman/suleiman/suleiman.component';
import { HeaderComponent } from './Suleiman/header/header.component';
import { HomeComponent } from './Suleiman/home/home.component';
import { AboutusComponent } from './Suleiman/aboutus/aboutus.component';
import { ContactusComponent } from './Suleiman/contactus/contactus.component';
import { SignUpComponent } from './Sally/sign-up/sign-up.component';
import { SignInComponent } from './Sally/sign-in/sign-in.component';
import { ChefListComponent } from './Sofyan/chef-list/chef-list.component';
import { FooterComponent } from './Suleiman/footer/footer.component';
import { PaymentComponent } from './Admin/payment/payment.component';
import { EditProfileComponent } from './Sondos/edit-profile/edit-profile.component';
import { PtofileComponent } from './Sondos/ptofile/ptofile.component';
import { ForgotPasswordComponent } from './Sally/forgot-password/forgot-password.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';

import { UserPaymentComponent } from './Sajeda/user-payment/user-payment.component';
import { CheifBookingComponent } from './Sajeda/cheif-booking/cheif-booking.component';


@NgModule({
  declarations: [
    AppComponent,
    SaraComponent,
    SofyanComponent,
    SondosComponent,
    SuleimanComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    SignUpComponent,
    SignInComponent,
    ChefListComponent,

    PaymentComponent,
    SignInComponent,
    SignUpComponent,
    EditProfileComponent,
    PtofileComponent,
    ForgotPasswordComponent,
    DashboardComponent,
 
    CheifBookingComponent,
    UserPaymentComponent



    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
