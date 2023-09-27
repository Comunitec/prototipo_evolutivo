import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Importe RouterModule e Routes

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { InitialactionsComponent } from './components/initialactions/initialactions.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'HeaderComponent', component: HeaderComponent },
  { path: 'signup', component: SignupComponent },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    HomeComponentComponent,
    InitialactionsComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes) // Use RouterModule.forRoot para configurar as rotas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

