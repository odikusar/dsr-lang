import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, UnauthGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/workspace/workspace.module').then((m) => m.WorkspaceModule),
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/login/login.component').then((mod) => mod.LoginComponent),
    canActivate: [UnauthGuard],
  },
  {
    path: 'about',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/about/about.component').then((mod) => mod.AboutComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/page-not-found/page-not-found.component').then(
        (mod) => mod.PageNotFoundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
