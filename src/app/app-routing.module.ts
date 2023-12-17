import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FindJobComponent } from './components/find-job/find-job.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:"home", component:HomeComponent}, 
  {path:"find-job", component:FindJobComponent},
  {path:"post-job", component:PostJobComponent, canActivate:[AuthGuard]},
  {path:"about-us", component:AboutUsComponent},
  {path:"login", component:LoginComponent},
  {path:"signin", component:SignupComponent},
  {path:"", redirectTo:"home",pathMatch:"full"},
  // {path:"**", component:ErrorpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
