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
    loadChildren: () => import('./features/login/login.module').then((m) => m.LoginModule),
    canActivate: [UnauthGuard],
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/static/404', /// !!!
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
