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
  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
