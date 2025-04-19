import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmmarComponent } from './Ammar/ammar/ammar.component';
import { SaraComponent } from './Sara/sara/sara.component';
import { SofyanComponent } from './Sofyan/sofyan/sofyan.component';
import { SondosComponent } from './Sondos/sondos/sondos.component';
import { SuleimanComponent } from './Suleiman/suleiman/suleiman.component';
import { FooterComponent } from './Suleiman/footer/footer.component';
import { HeaderComponent } from './Suleiman/header/header.component';
import { HomeComponent } from './Suleiman/home/home.component';
import { AboutusComponent } from './Suleiman/aboutus/aboutus.component';
import { ContactusComponent } from './Suleiman/contactus/contactus.component';
import { SignUpComponent } from './Sally/sign-up/sign-up.component';
import { SignInComponent } from './Sally/sign-in/sign-in.component';
import { ChefListComponent } from './Sofyan/chef-list/chef-list.component';
import { BookingComponent } from './Sajeda/booking/booking.component';
import { PaymentComponent } from './Sajeda/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    AmmarComponent,
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
    ContactusComponent,
    ChefListComponent,
    BookingComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
