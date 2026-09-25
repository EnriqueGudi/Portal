import { Routes } from '@angular/router';
import { EjemplosComponents } from './modules/login/Ejemplos.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: EjemplosComponents
  }

];