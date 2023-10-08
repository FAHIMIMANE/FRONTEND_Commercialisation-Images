import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMainComponent } from './app.main.component';
import { AuthGuard } from './controller/guards/auth.guard';
import { AccessDeniedComponent } from './auth/access-denied/access-denied.component';
import { HomeComponent } from './demo/view/home/home.component';
import {LoginChercheurComponent} from './module/chercheur/login-chercheur/login-chercheur.component';
import {RegisterChercheurComponent} from './module/chercheur/register-chercheur/register-chercheur.component';
import {LoginAdminComponent} from './module/admin/login-admin/login-admin.component';
import {RegisterAdminComponent} from './module/admin/register-admin/register-admin.component';
import {LoginClientComponent} from './module/client/login-client/login-client.component';
import {RegisterClientComponent} from './module/client/register-client/register-client.component';
import {LoginContributeurComponent} from './module/contributeur/login-contributeur/login-contributeur.component';
import {RegisterContributeurComponent} from './module/contributeur/register-contributeur/register-contributeur.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
          { path: '', component: HomeComponent },
        {path: 'chercheur/login', component: LoginChercheurComponent },
        {path: 'chercheur/register', component: RegisterChercheurComponent },
        {path: 'admin/login', component: LoginAdminComponent },
        {path: 'admin/register', component: RegisterAdminComponent },
        {path: 'client/login', component: LoginClientComponent },
        {path: 'client/register', component: RegisterClientComponent },
        {path: 'contributeur/login', component: LoginContributeurComponent },
        {path: 'contributeur/register', component: RegisterContributeurComponent },
         {
          path: 'app', // '\'' + root + '\'',
          component: AppMainComponent,
          children: [
            {
              path: 'chercheur',
              loadChildren: () => import('./module/chercheur/chercheur-routing.module').then(m => m.ChercheurRoutingModule),
              canActivate: [AuthGuard],
            },
            {
              path: 'admin',
              loadChildren: () => import('./module/admin/admin-routing.module').then(m => m.AdminRoutingModule),
              canActivate: [AuthGuard],
            },
            {
              path: 'client',
              loadChildren: () => import('./module/client/client-routing.module').then(m => m.ClientRoutingModule),
              canActivate: [AuthGuard],
            },
            {
              path: 'contributeur',
              loadChildren: () => import('./module/contributeur/contributeur-routing.module').then(m => m.ContributeurRoutingModule),
              canActivate: [AuthGuard],
            },
            { path: 'denied', component: AccessDeniedComponent },
          ],
          canActivate: [AuthGuard]
        },
      ],
      { scrollPositionRestoration: 'enabled' }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
