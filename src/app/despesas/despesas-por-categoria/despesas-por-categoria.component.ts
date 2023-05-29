import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DespesasService } from '../services/despesas.service';
import { catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { DespesasPorCategoria } from '../model/despeas-por-categoria';

@Component({
  selector: 'app-despesas-por-categoria',
  templateUrl: './despesas-por-categoria.component.html',
  styleUrls: ['./despesas-por-categoria.component.scss']
})
export class DespesasPorCategoriaComponent {


  despesasPorCategoria$: Observable<DespesasPorCategoria[]>;
  displayedColumns: string[] = ['categoriaCodigo','categoriaNome', 'empenho', 'liquidacao', 'pagamento'];
  chartOptions = {
    animationEnabled: true,
    animationDuration: 2000,
    title: {
      text: "Despesas por Categoria Econômica"
    },
    toolTip:  {
      shared: true
    },
    axisY: {
      prefix: "R$ ",
      suffix: " mi",
      includeZero: true,
    },
    axisX: {
      reversed: true,
      
    },
    data: [{
      type: "stackedBar",
      name: "Empenhado",
      showInLegend: true,
      legendMarkerType: "square",
      dataPoints: [
        {  y: 40.75, label: "Q1"},
        {  y: 27.3, label: "Q2" },
        {  y: 11, label: "Q3" },
        {  y: 34, label: "Q4" }
      ]
    }]
  };
  constructor(
    private despesasService: DespesasService,
    private dialog: MatDialog
  ) {
    this.despesasPorCategoria$ = this.despesasService.getDespesasCategoria()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar despesas totais ');
          return of([]);
        }
        ));

    this.despesasPorCategoria$.subscribe(despesas => {

      this.chartOptions.data = despesas.map(d => {
        return{
          type: "stackedBar",
          name: d.categoriaNome,
          showInLegend: true,
          legendMarkerType: "square",
          dataPoints: [
            {  y: d.empenho/ 1000000, label: "Empenhado"},
            {  y: d.liquidacao/ 1000000, label: "Liquidado" },
            {  y: d.pagamento/ 1000000, label: "Pago" }
          ]
        };

      });




    }); 

  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
