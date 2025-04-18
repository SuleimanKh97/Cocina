import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Suleiman/home/home.component';
import { ContactusComponent } from './Suleiman/contactus/contactus.component';
import { ChefListComponent } from './Sofyan/chef-list/chef-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'chefs', component: ChefListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
