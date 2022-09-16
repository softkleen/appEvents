import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarUsuarioPage } from './mostrar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarUsuarioPageRoutingModule {}
