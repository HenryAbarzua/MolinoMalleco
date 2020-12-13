import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { ClientViewComponent } from './client-view/client-view.component';
import {ProductViewComponent} from './product-view/product-view.component';
import { ListCustomersComponent} from './components/list-customers/list-customers.component'
import { LaboratorioComponent } from './components/laboratorio/laboratorio.component';
import { InformesComponent } from './components/informes/informes.component';


const routes: Routes = [
{path:'',
 redirectTo:'/home',
 pathMatch:'full' 
},  
{ path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
{ path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) }, 
{ path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)},
{ path: 'verification-email', component: SendEmailComponent },
{ path: 'forgot-password', loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
{ path: 'products', component: ProductViewComponent, },
{ path: 'clientes', component: ClientViewComponent, },
{ path: 'customers', component: ListCustomersComponent},
{ path: 'laboratorio', component: LaboratorioComponent},
{ path: 'informes', component: InformesComponent}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
