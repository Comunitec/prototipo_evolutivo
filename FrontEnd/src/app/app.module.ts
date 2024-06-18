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
import { ModalAlterarSenhaComponent } from './components/modal-alterar-senha/modal-alterar-senha.component';
import { ModalConfimarAlteracaoComponent } from './components/modal-confimar-alteracao/modal-confimar-alteracao.component';
import { ModalExcluirContaComponent } from './components/modal-excluir-conta/modal-excluir-conta.component';
import { ModalCancelarAlteracaoComponent } from './components/modal-cancelar-alteracao/modal-cancelar-alteracao.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { ModalRecuperarSenhaComponent } from './components/modal-recuperar-senha/modal-recuperar-senha.component';
import { AlterarSenhaComponent } from './pages/alterar-senha/alterar-senha.component';
import { FinalizarCursoComponent } from './pages/finalizar-curso/finalizar-curso.component';
import { GerenciarUsuariosComponent } from './pages/gerenciar-usuarios/gerenciar-usuarios.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ClassFormComponent } from './components/class-form/class-form.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { EditCourseFormComponent } from './pages/edit/edit-course-form/edit-course-form.component';
import { ModalSaibaMaisFormularioComponent } from './components/modal-saiba-mais-formulario/modal-saiba-mais-formulario.component';
import { ModalAulaSalvaComponent } from './components/modal-aula-salva/modal-aula-salva.component';
import { ModalErroAoSalvarAulaComponent } from './components/modal-erro-ao-salvar-aula/modal-erro-ao-salvar-aula.component';
import { ModalCursoenviadoParaAprovacaoComponent } from './components/modal-cursoenviado-para-aprovacao/modal-cursoenviado-para-aprovacao.component';
import { ModalConfirmacaoParaInativarComponent } from './components/modal-confirmacao-para-inativar/modal-confirmacao-para-inativar.component';
import { ModalErroAoEditarCursoComponent } from './components/modal-erro-ao-editar-curso/modal-erro-ao-editar-curso.component';
import { CursoEditadoComSucessoComponent } from './components/curso-editado-com-sucesso/curso-editado-com-sucesso.component';
import { ModalCursoCriadoComponent } from './components/modal-curso-criado/modal-curso-criado.component';
import { ModalSaibaMaisVideoComponent } from './components/modal-saiba-mais-video/modal-saiba-mais-video.component';
import { ModalDeletarCursoComponent } from './components/modal-deletar-curso/modal-deletar-curso.component';
import { ModalEditarUsuarioComponent } from './components/modal-editar-usuario/modal-editar-usuario.component';
import { FaqFormComponent } from './pages/faq-form/faq-form.component';
import { ModalCursoFinalizadoComponent } from './components/modal-curso-finalizado/modal-curso-finalizado.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RankingService } from './services/ranking.service';
import { AtualizarPerfilService } from './services/atualizar-perfil.service';
import { MatIconModule } from '@angular/material/icon';
import { ModalAulaJaEstaFinalizadaComponent } from './components/modal-aula-ja-esta-finalizada/modal-aula-ja-esta-finalizada.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

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
  {path: 'assistirAulas/:id', component: AssistirAulasComponent},
  {path: 'detalheCurso/:id', component: DetalheCursoComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'ranking-page', component: RankingPageComponent},
  {path: 'staff', component: StaffComponent},
  {path: 'recuperar-senha', component: RecuperarSenhaComponent},
  {path: 'alterar-senha', component: AlterarSenhaComponent},
  {path: 'finalizarCurso', component: FinalizarCursoComponent},
  {path: 'gerenciar-usuarios', component: GerenciarUsuariosComponent},
  {path: 'excluir-conta', component: ModalExcluirContaComponent},
  {path: 'EditCourseFormComponent/:id', component: EditCourseFormComponent},
  { path: 'editar-usuario', component: ModalEditarUsuarioComponent},
  {path: 'FaqFormComponent', component: FaqFormComponent},




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
    ModalAlterarSenhaComponent,
    ModalSalvarCursoComponent,
    ModalConfimarAlteracaoComponent,
    ModalExcluirContaComponent,
    ModalCancelarAlteracaoComponent,
    RecuperarSenhaComponent,
    ModalRecuperarSenhaComponent,
    AlterarSenhaComponent,
    FinalizarCursoComponent,
    GerenciarUsuariosComponent,
    ClassFormComponent,
    QuizFormComponent,
    EditCourseFormComponent,
    ModalSaibaMaisFormularioComponent,
    ModalAulaSalvaComponent,
    ModalErroAoSalvarAulaComponent,
    ModalCursoenviadoParaAprovacaoComponent,
    ModalConfirmacaoParaInativarComponent,
    ModalErroAoEditarCursoComponent,
    CursoEditadoComSucessoComponent,
    ModalCursoCriadoComponent,
    ModalSaibaMaisVideoComponent,
    ModalDeletarCursoComponent,
    ModalEditarUsuarioComponent,
    FaqFormComponent,
    ModalCursoFinalizadoComponent,
    ModalAulaJaEstaFinalizadaComponent,
    SignupFormComponent,

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
    MatRadioModule,
    MatTabsModule,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [RankingService, AtualizarPerfilService],
  bootstrap: [AppComponent]
})
export class AppModule { }

