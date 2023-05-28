import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesasPorFonteComponent } from './despesas-por-fonte.component';

describe('DespesasPorFonteComponent', () => {
  let component: DespesasPorFonteComponent;
  let fixture: ComponentFixture<DespesasPorFonteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespesasPorFonteComponent]
    });
    fixture = TestBed.createComponent(DespesasPorFonteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
