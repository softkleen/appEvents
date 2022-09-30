import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipantesPage } from './participantes.page';

const routes: Routes = [
  {
    path: '',
    component: ParticipantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipantesPageRoutingModule {}
