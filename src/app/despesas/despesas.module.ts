import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { DespesasRoutingModule } from './despesas-routing.module';
import { DespesasTotaisComponent } from './despesas-totais/despesas-totais.component';
import { MoneyPipe } from '../shared/pipe/number-formater';
import { SharedModule } from '../shared/shared.module';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DespesasPorMesComponent } from './despesas-por-mes/despesas-por-mes.component';


@NgModule({
  declarations: [
    DespesasTotaisComponent,
    MoneyPipe,
    DespesasPorMesComponent
  ],
  imports: [
    CommonModule,
    DespesasRoutingModule,
    AppMaterialModule,
    SharedModule,
    CanvasJSAngularChartsModule
  ]
})
export class DespesasModule { }
