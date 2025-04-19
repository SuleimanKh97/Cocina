import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmmarComponent } from './Ammar/ammar/ammar.component';
import { SajedaComponent } from './Sajeda/sajeda/sajeda.component';
import { SaraComponent } from './Sara/sara/sara.component';
import { SofyanComponent } from './Sofyan/sofyan/sofyan.component';
import { SondosComponent } from './Sondos/sondos/sondos.component';
import { SuleimanComponent } from './Suleiman/suleiman/suleiman.component';

@NgModule({
  declarations: [
    AppComponent,
    AmmarComponent,
    SajedaComponent,
    SaraComponent,
    SofyanComponent,
    SondosComponent,
    SuleimanComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
