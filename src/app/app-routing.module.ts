import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '@features/about/about.component';
import { LoginComponent } from '@features/login/login.component';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
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
    component: LoginComponent,
    canActivate: [UnauthGuard],
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent,
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
