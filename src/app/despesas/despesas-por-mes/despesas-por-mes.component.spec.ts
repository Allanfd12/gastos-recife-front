import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesasPorMesComponent } from './despesas-por-mes.component';

describe('DespesasPorMesComponent', () => {
  let component: DespesasPorMesComponent;
  let fixture: ComponentFixture<DespesasPorMesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespesasPorMesComponent]
    });
    fixture = TestBed.createComponent(DespesasPorMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
