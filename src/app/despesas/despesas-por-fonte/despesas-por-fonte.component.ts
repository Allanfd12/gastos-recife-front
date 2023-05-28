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
    axisY: {
      prefix: "R$ ",
      suffix: " mi",
      scaleBreaks: {
        autoCalculate: true //change it to false
      }
    },

    data: [{
      type: "doughnut",
      name: "Empenhado",

      dataPoints: [
        { x: "1", y: 8 },
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
      var empenhados = despesas.map(d => d.empenho / 1000000);
      var liquidados = despesas.map(d => d.liquidacao / 1000000);
      var pagos = despesas.map(d => d.pagamento / 1000000);


      this.chartOptions.data = [
        {
          type: "doughnut",
          name: "Empenhado",
        
          dataPoints: despesas.map((d) => { return { x: d.fonteNome, y: d.empenho/ 1000000 }; })
        },


      ];


    }); 

  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
