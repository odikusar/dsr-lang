import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, UnauthGuard } from './guards';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

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
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
