import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLaboratorioComponent } from './form-laboratorio.component';

describe('FormLaboratorioComponent', () => {
  let component: FormLaboratorioComponent;
  let fixture: ComponentFixture<FormLaboratorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLaboratorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
