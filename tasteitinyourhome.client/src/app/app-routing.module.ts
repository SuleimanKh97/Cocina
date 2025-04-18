import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Suleiman/home/home.component';
import { ContactusComponent } from './Suleiman/contactus/contactus.component';
import { SignInComponent } from './Sally/sign-in/sign-in.component';
import { SignUpComponent } from './Sally/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'Login', component: SignInComponent },
  { path: 'Register', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
