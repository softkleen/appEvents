import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParticipantesPageRoutingModule } from './participantes-routing.module';

import { ParticipantesPage } from './participantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticipantesPageRoutingModule
  ],
  declarations: [ParticipantesPage]
})
export class ParticipantesPageModule {}
