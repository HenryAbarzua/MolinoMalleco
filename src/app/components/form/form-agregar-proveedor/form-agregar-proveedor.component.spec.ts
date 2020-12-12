import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgregarProveedorComponent } from './form-agregar-proveedor.component';

describe('FormAgregarProveedorComponent', () => {
  let component: FormAgregarProveedorComponent;
  let fixture: ComponentFixture<FormAgregarProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAgregarProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAgregarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
