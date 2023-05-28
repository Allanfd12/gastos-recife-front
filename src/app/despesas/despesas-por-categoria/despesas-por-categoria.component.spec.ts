import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesasPorCategoriaComponent } from './despesas-por-categoria.component';

describe('DespesasPorCategoriaComponent', () => {
  let component: DespesasPorCategoriaComponent;
  let fixture: ComponentFixture<DespesasPorCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespesasPorCategoriaComponent]
    });
    fixture = TestBed.createComponent(DespesasPorCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
