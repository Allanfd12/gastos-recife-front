import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DespesasTotaisComponent } from './despesas-totais/despesas-totais.component';
import { DespesasPorMesComponent } from './despesas-por-mes/despesas-por-mes.component';

const routes: Routes = [
  { path: '', component: DespesasTotaisComponent },
  { path: 'mes', component: DespesasPorMesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesasRoutingModule { }
