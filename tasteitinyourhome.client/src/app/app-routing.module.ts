import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Suleiman/home/home.component';
import { ContactusComponent } from './Suleiman/contactus/contactus.component';
import { SignInComponent } from './Sally/sign-in/sign-in.component';
import { SignUpComponent } from './Sally/sign-up/sign-up.component';
import { ChefListComponent } from './Sofyan/chef-list/chef-list.component';
import { ForgotPasswordComponent } from './Sally/forgot-password/forgot-password.component';
import { PtofileComponent } from './Sondos/ptofile/ptofile.component';
import { EditProfileComponent } from './Sondos/edit-profile/edit-profile.component';
import { AboutusComponent } from './Suleiman/aboutus/aboutus.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UsersComponent } from './Admin/users/users.component';
import { ChefsComponent } from './Admin/chefs/chefs.component';
import { FoodComponent } from './Admin/food/food.component';
import { CategoryComponent } from './Admin/category/category.component';
import { ServiceComponent } from './Admin/service/service.component';
import { BookingComponent } from './Admin/booking/booking.component';
import { PaymentComponent } from './Admin/payment/payment.component';
import { ContactusadminComponent } from './Admin/contactusadmin/contactusadmin.component';
import { FeedbackadminComponent } from './Admin/feedbackadmin/feedbackadmin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'Login', component: SignInComponent },
  { path: 'Register', component: SignUpComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'chefs', component: ChefListComponent },
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
    { path: 'chefs', component: ChefListComponent },
    { path: "profile", component: PtofileComponent },
    { path: "edit-profile/:id", component: EditProfileComponent }

  {
    path: "dashboard", component: DashboardComponent, children:
      [

        { path: "users", component: UsersComponent } ,
        { path: "chefs", component: ChefsComponent },
        { path: "food", component: FoodComponent },
        { path: "category", component: CategoryComponent },
        { path: "service", component: ServiceComponent },
        { path: "booking", component: BookingComponent },
        { path: "payment", component: PaymentComponent },
        { path: "contactusadmin", component: ContactusadminComponent },
        { path: "feedbackadmin", component: FeedbackadminComponent },







]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
