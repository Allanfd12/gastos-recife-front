import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { DespesasRoutingModule } from './despesas-routing.module';
import { DespesasTotaisComponent } from './despesas-totais/despesas-totais.component';
import { MoneyPipe } from '../shared/pipe/number-formater';


@NgModule({
  declarations: [
    DespesasTotaisComponent,
    MoneyPipe
  ],
  imports: [
    CommonModule,
    DespesasRoutingModule,
    AppMaterialModule
  ]
})
export class DespesasModule { }