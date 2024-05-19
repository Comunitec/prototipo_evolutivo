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
import { MeusCursosProfessorComponent } from './pages/meus-cursos-professor/meus-cursos-professor.component';
import { MeusCursosAlunoComponent } from './pages/meus-cursos-aluno/meus-cursos-aluno.component';
import { AssistirAulasComponent } from './pages/assistir-aulas/assistir-aulas.component';
import { DetalheCursoComponent } from './pages/detalhe-curso/detalhe-curso.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalMatRealizadaComponent } from './components/modal-mat-realizada/modal-mat-realizada.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ModalWQuestoesComponent } from './components/modal-wquestoes/modal-wquestoes.component';
import {MatRadioModule} from '@angular/material/radio';
import { FaqComponent } from './pages/faq/faq.component';
import { ModalUsuarioCriadoComponent } from './components/modal-usuario-criado/modal-usuario-criado.component';
import { ModalErroAoCriarUsuarioComponent } from './components/modal-erro-ao-criar-usuario/modal-erro-ao-criar-usuario.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { RankingPageComponent } from './pages/ranking-page/ranking-page.component';
import { PesquisaComponent } from './components/pesquisa/pesquisa.component';
import { StaffComponent } from './pages/staff/staff.component';
import { ModalSalvarCursoComponent } from './components/modal-salvar-curso/modal-salvar-curso.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'HeaderComponent', component: HeaderComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent},
  { path: 'courseForm', component: CourseFormComponent},
  { path: 'home', component: HomeComponentComponent},
  { path: 'home-logado', component: HomeLogadoComponent},
  { path: 'perfil', component: PerfilComponent},
  {path: 'meusCursosProfessor', component: MeusCursosProfessorComponent},
  {path: 'meusCursosAluno', component: MeusCursosAlunoComponent},
  {path: 'assistirAulas', component: AssistirAulasComponent},
  {path: 'detalheCurso', component: DetalheCursoComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'ranking-page', component: RankingPageComponent},
  {path: 'staff', component: StaffComponent},

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
    MeusCursosProfessorComponent,
    MeusCursosAlunoComponent,
    AssistirAulasComponent,
    DetalheCursoComponent,
    ModalMatRealizadaComponent,
    ModalWQuestoesComponent,
    FaqComponent,
    ModalUsuarioCriadoComponent,
    ModalErroAoCriarUsuarioComponent,
    PesquisaComponent,
    RankingComponent,
    RankingPageComponent,
    StaffComponent,
    ModalSalvarCursoComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // Use RouterModule.forRoot para configurar as rotas
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatExpansionModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

