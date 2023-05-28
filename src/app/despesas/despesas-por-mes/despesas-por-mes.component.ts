import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DespesasService } from '../services/despesas.service';
import { catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { DespesasPorMes } from '../model/despesas-por-mes';

@Component({
  selector: 'app-despesas-por-mes',
  templateUrl: './despesas-por-mes.component.html',
  styleUrls: ['./despesas-por-mes.component.scss']
})
export class DespesasPorMesComponent {

  despesasPorMes$: Observable<DespesasPorMes[]>;
  displayedColumns: string[] = ['mes', 'empenho', 'liquidacao', 'pagamento'];
  chartOptions = {
    animationEnabled: true,
    animationDuration: 2000,
    title: {
      text: "Despesas por mês"
    },
    toolTip: {
      shared: true  //disable here. 
    },
    axisY: {
      prefix: "R$ ",
      suffix: " mi",
    },
    axisX: {
      interval: 1,
      minimum:1,
      maximum:12
    },
    data: [{
      type: "area",
      fillOpacity: .3,
      name: "Empenhado",
      showInLegend: true,
      legendMarkerType: "square",
      markerSize: 0,
      dataPoints: [
        { x: 1, y: 8 },
        { x: 2, y: 8 },
      ]
    }]
  };
  constructor(
    private despesasService: DespesasService,
    private dialog: MatDialog
  ) {
    this.despesasPorMes$ = this.despesasService.getDespesasMes()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar despesas totais ');
          return of([]);
        }
        ));

    this.despesasPorMes$.subscribe(despesas => {
      var empenhados = despesas.map(d => d.empenho / 1000000);
      var liquidados = despesas.map(d => d.liquidacao / 1000000);
      var pagos = despesas.map(d => d.pagamento / 1000000);


      this.chartOptions.data = [
        {
          type: "area",
          fillOpacity: .3,
          name: "Empenhado",
          showInLegend: true,
          legendMarkerType: "square",
          markerSize: 0,
          dataPoints: empenhados.map((v, i) => { return { x: i + 1, y: v }; })
        },
        {
          type: "area",
          fillOpacity: .3,
          name: "Liquidado",
          showInLegend: true,
          legendMarkerType: "square",
          markerSize: 0,
          dataPoints: liquidados.map((v, i) => { return { x: i + 1, y: v }; })
        },
        {
          type: "area",
          fillOpacity: .3,
          name: "Pago",
          showInLegend: true,
          legendMarkerType: "square",
          markerSize: 0,
          dataPoints: pagos.map((v, i) => { return { x: i + 1, y: v }; })
        }

      ];


    });

  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
