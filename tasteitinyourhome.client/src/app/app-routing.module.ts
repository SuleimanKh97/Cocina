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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'Login', component: SignInComponent },
  { path: 'Register', component: SignUpComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'chefs', component: ChefListComponent },
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
    { path: 'chefs', component: ChefListComponent },
    { path: "profile", component: PtofileComponent },
    { path: "edit-profile/:id", component: EditProfileComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
