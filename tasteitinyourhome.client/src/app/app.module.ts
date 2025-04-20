import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SajedaComponent } from './Sajeda/sajeda/sajeda.component';
import { SaraComponent } from './Sara/sara/sara.component';
import { SofyanComponent } from './Sofyan/sofyan/sofyan.component';
import { SondosComponent } from './Sondos/sondos/sondos.component';
import { SuleimanComponent } from './Suleiman/suleiman/suleiman.component';
import { ForgotPasswordComponent } from './Sally/forgot-password/forgot-password.component';
import { PtofileComponent } from './Sondos/ptofile/ptofile.component';
import { EditProfileComponent } from './Sondos/edit-profile/edit-profile.component';
import { HomeComponent } from './Suleiman/home/home.component';
import { SignUpComponent } from './Sally/sign-up/sign-up.component';
import { SignInComponent } from './Sally/sign-in/sign-in.component';
import { FooterComponent } from './Suleiman/footer/footer.component';
import { HeaderComponent } from './Suleiman/header/header.component';
import { ChefListComponent } from './Sofyan/chef-list/chef-list.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UsersComponent } from './Admin/users/users.component';
import { ChefsComponent } from './Admin/chefs/chefs.component';
import { FoodComponent } from './Admin/food/food.component';
import { ServiceComponent } from './Admin/service/service.component';
import { BookingComponent } from './Admin/booking/booking.component';
import { PaymentComponent } from './Admin/payment/payment.component';
import { ContactusadminComponent } from './Admin/contactusadmin/contactusadmin.component';
import { FeedbackadminComponent } from './Admin/feedbackadmin/feedbackadmin.component';
import { AboutusComponent } from './Suleiman/aboutus/aboutus.component';
import { ContactusComponent } from './Suleiman/contactus/contactus.component';




@NgModule({
  declarations: [
    AppComponent,
    SajedaComponent,
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
    ForgotPasswordComponent,
    PtofileComponent,
    EditProfileComponent,
    ChefListComponent,
    EditProfileComponent,
    DashboardComponent,
    UsersComponent,
    ChefsComponent,
    FoodComponent,
    ServiceComponent,
    BookingComponent,
    PaymentComponent,
    ContactusadminComponent,
    FeedbackadminComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule,
    ReactiveFormsModule,
    BrowserModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
