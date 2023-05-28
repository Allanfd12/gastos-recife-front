import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DespesasTotaisComponent } from './despesas-totais/despesas-totais.component';

const routes: Routes = [
  { path: '', component: DespesasTotaisComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesasRoutingModule { }
