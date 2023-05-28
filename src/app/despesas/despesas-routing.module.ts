import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DespesasTotaisComponent } from './despesas-totais/despesas-totais.component';
import { DespesasPorMesComponent } from './despesas-por-mes/despesas-por-mes.component';
import { DespesasPorCategoriaComponent } from './despesas-por-categoria/despesas-por-categoria.component';
import { DespesasPorFonteComponent } from './despesas-por-fonte/despesas-por-fonte.component';

const routes: Routes = [
  { path: '', component: DespesasTotaisComponent },
  { path: 'mes', component: DespesasPorMesComponent },
  { path: 'categoria', component: DespesasPorCategoriaComponent },
  { path: 'fonte', component: DespesasPorFonteComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesasRoutingModule { }
