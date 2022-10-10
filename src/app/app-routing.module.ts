import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormNuevoLibroComponent } from './components/form-nuevo-libro/form-nuevo-libro.component'
import { MislibrosComponent } from './components/mislibros/mislibros.component'

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: '/main' },
  { path:'main', component: MainComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  { path:'misLibros', component: MislibrosComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  { path:'anadirNuevoLibro', component: FormNuevoLibroComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  { path:'editarLibro/:id', component: FormNuevoLibroComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404'}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
