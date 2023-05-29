import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DespesasService } from '../services/despesas.service';
import { catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { DespesasPorFonte } from '../model/despesas-por-fonte';

@Component({
  selector: 'app-despesas-por-fonte',
  templateUrl: './despesas-por-fonte.component.html',
  styleUrls: ['./despesas-por-fonte.component.scss']
})
export class DespesasPorFonteComponent {

  despesasPorFonte$: Observable<DespesasPorFonte[]>;
  displayedColumns: string[] = ['fonteCodigo','fonteNome', 'empenho', 'liquidacao', 'pagamento'];
  chartOptions = {
    animationEnabled: true,
    animationDuration: 2000,
    title: {
      text: "Despesas por Fonte Recursos"
    },
    toolTip:  {
      contentFormatter: function (e:any) {
				var content = " ";
				for (var i = 0; i < e.entries.length; i++) {
					content += "<strong>"+e.entries[i].dataSeries.name + ":</strong>  " + "R$" + moneyScale(e.entries[i].dataPoint.y) ;
					content += "<br/>";
				}

				return content;
			}
    },
    legend: {
      fontSize: 10,
      verticalAlign: "center",
      horizontalAlign: "left"
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
      type: "doughnut",
      name: "Empenhado",

      dataPoints: [
       { y: 0, label: "Empenhado"},
       { y: '0', label: "Empenhado"},
        { x: "2", y: 8 },
      ]
    }]
  };
  constructor(
    private despesasService: DespesasService,
    private dialog: MatDialog
  ) {
    this.despesasPorFonte$ = this.despesasService.getDespesasFonte()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar despesas totais ');
          return of([]);
        }
        ));
        this.despesasPorFonte$.subscribe(despesas => {
        var dcimal = 4.023556;
        var money = dcimal.toFixed(2);
        this.chartOptions.data = despesas.sort((a, b) => b.empenho - a.empenho)
        .map(d => {
          return{
            type: "stackedBar",
            name: d.fonteCodigo,
            showInLegend: true,
            legendMarkerType: "square",
            dataPoints: [
              {  y: d.empenho/ 1000000, label: "Empenhado"},
              {  y: d.liquidacao/ 1000000, label: "Liquidado" },
              {  y: d.pagamento/ 1000000, label: "Pago" }
            ]
          };
  
        });

/**    
      this.chartOptions.data = [
        {
          type: "doughnut",
          name: "Empenhado",
        
          dataPoints: despesas.map((d) => { return { x: d.fonteNome, y: d.empenho/ 1000000 }; })
        },
      ];
    */  });

  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  

}
function moneyScale(value: number) {
  if(value >900){
    return (value/1000).toFixed(2) + ' bi';
  }
  return value.toFixed(2)+ ' mi';
}
