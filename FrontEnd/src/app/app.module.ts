import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Importe RouterModule e Routes

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponentComponent } from './pages/home-component/home-component.component';
import { InitialactionsComponent } from './components/initialactions/initialactions.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CourseFormComponent } from './pages/course-form/course-form.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HomeLogadoComponent } from './pages/home-logado/home-logado.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './pages/home/home.component';
import { LeftColumnComponent } from './components/left-column/left-column.component';
import { RightColumnComponent } from './components/right-column/right-column.component';
import { MiddleColumnComponent } from './components/middle-column/middle-column.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { CursoComponent } from './components/curso/curso.component';
import { ManageCourseComponent } from './pages/manage-course/manage-course.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'HeaderComponent', component: HeaderComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent},
  { path: 'courseForm', component: CourseFormComponent},
  { path: 'home', component: HomeComponentComponent},
  { path: 'home-logado', component: HomeLogadoComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'manageCourse', component: ManageCourseComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponentComponent,
    InitialactionsComponent,
    SignupComponent,
    LoginComponent,
    CourseFormComponent,
    PerfilComponent,
    HomeLogadoComponent,
    HomeComponent,
    LeftColumnComponent,
    RightColumnComponent,
    MiddleColumnComponent,
    MenuLateralComponent,
    CursoComponent,
    ManageCourseComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule // Use RouterModule.forRoot para configurar as rotas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

