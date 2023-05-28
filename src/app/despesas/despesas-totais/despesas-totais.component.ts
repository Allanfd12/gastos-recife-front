import { Component } from '@angular/core';
import { DespesasTotais } from '../model/despesas-totais';
import { Observable } from 'rxjs/internal/Observable';
import { DespesasService } from '../services/despesas.service';
import { catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-despesas-totais',
  templateUrl: './despesas-totais.component.html',
  styleUrls: ['./despesas-totais.component.scss']
})
export class DespesasTotaisComponent {
  despesasTotais$: Observable<DespesasTotais[]>;
  displayedColumns: string[] = ['ano', 'empenho', 'liquidacao', 'pagamento'];
  chartOptions = {
    animationEnabled: true, 
		animationDuration: 2000, 
    toolTip:{
      enabled: false   //enable here
    },
    title: {
    	text: "Resumo das Despesas"
    },
    axisY: {
      interval:0.03,
      viewportMinimum:4.05,
      prefix: "R$ ", 
      suffix: " bi",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    

    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Empenhado",  y: 0  },
        { label: "Liquidado", y: 0  },
        { label: "Pago", y: 0  },
      ]
    }]                
  };
  constructor(
    private despesasService: DespesasService,
    private dialog: MatDialog
    ) {
    this.despesasTotais$ = this.despesasService.getDespesas()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar despesas totais ');
        return of([]);
      }
    ));

    this.despesasTotais$.subscribe(despesas => {


      this.chartOptions.data[0] = {
        type: "column",
        dataPoints: [
          { label: "Empenhado",  y: despesas[0].empenho/1000000000  },
          { label: "Liquidado", y: despesas[0].liquidacao /1000000000},
          { label: "Pago", y: despesas[0].pagamento /1000000000 },
        ]
      }

    });
  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
