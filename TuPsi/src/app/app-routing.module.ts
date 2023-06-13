import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './auth/login/login.component';
import { SignProfesionalComponent } from './auth/sign-profesional/sign-profesional.component';
import { AdminProfesionalesComponent } from './pages/admin-profesionales/admin-profesionales.component';
import { AdminPacientesComponent } from './pages/admin-pacientes/admin-pacientes.component';
import { AdminPlanesComponent } from './pages/admin-planes/admin-planes.component';
import { SignPacienteComponent } from './auth/sign-paciente/sign-paciente.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signProfesional', component: SignProfesionalComponent },
  { path: 'AdminProfesionales', component: AdminProfesionalesComponent},
  { path: 'AdminPacientes', component: AdminPacientesComponent},
  { path: 'AdminPlanes', component: AdminPlanesComponent},
  { path: 'signPaciente', component: SignPacienteComponent},
  { path: 'planes', component: PlanesComponent},
  {path: 'miPerfil', component: ProfileComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
