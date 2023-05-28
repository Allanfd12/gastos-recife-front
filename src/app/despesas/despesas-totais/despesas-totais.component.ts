import { Component } from '@angular/core';
import { DespesasTotais } from '../model/despesas-totais';
import { Observable } from 'rxjs/internal/Observable';
import { DespesasService } from '../services/despesas.service';

@Component({
  selector: 'app-despesas-totais',
  templateUrl: './despesas-totais.component.html',
  styleUrls: ['./despesas-totais.component.scss']
})
export class DespesasTotaisComponent {
  despesasTotais: Observable<DespesasTotais[]>;
  displayedColumns: string[] = ['ano', 'empenho', 'liquidacao', 'pagamento'];

  constructor(private despesasService: DespesasService) {
    this.despesasTotais = this.despesasService.getDespesas();
  }
}
