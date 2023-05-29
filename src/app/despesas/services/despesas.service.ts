import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DespesasTotais } from '../model/despesas-totais';
import { delay, first } from 'rxjs';
import { DespesasPorMes } from '../model/despesas-por-mes';
import { DespesasPorCategoria } from '../model/despeas-por-categoria';
import { DespesasPorFonte } from '../model/despesas-por-fonte';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  private readonly API = 'http://localhost:8080/despesas/2017/';

  constructor(private httpClient: HttpClient) {}

  getDespesas() {
    return this.httpClient.get<DespesasTotais[]>(`${this.API}total`)
    .pipe(
      first()
    )
  }
  getDespesasMes() {
    return this.httpClient.get<DespesasPorMes[]>(`${this.API}mes`)
    .pipe(
      first()
    )
  }
  getDespesasCategoria() {
    return this.httpClient.get<DespesasPorCategoria[]>(`${this.API}categoria`)
    .pipe(
      first()
    )
  }
  getDespesasFonte() {
    return this.httpClient.get<DespesasPorFonte[]>(`${this.API}fonte`)
    .pipe(
      first()
    )
  }
}
