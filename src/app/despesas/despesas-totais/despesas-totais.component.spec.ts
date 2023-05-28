import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesasTotaisComponent } from './despesas-totais.component';

describe('DespesasTotaisComponent', () => {
  let component: DespesasTotaisComponent;
  let fixture: ComponentFixture<DespesasTotaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespesasTotaisComponent]
    });
    fixture = TestBed.createComponent(DespesasTotaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
