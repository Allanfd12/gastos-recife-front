import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DespesasTotais } from '../model/despesas-totais';
import { delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  private readonly API = 'http://localhost:8080/despesas/2017/total';

  constructor(private httpClient: HttpClient) {}

  getDespesas() {
    return this.httpClient.get<DespesasTotais[]>(this.API)
    .pipe(
      first()
    )
  }
}
