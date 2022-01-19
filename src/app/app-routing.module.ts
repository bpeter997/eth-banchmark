import { AuthComponent } from './components/auth/auth.component';
import { InfoComponent } from './components/info/info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AuthComponent},
  { path: 'login', component: AuthComponent },
  { path: 'overview', component: InfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
