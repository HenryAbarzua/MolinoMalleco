import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgregarComponent } from './form-agregar.component';

describe('FormAgregarComponent', () => {
  let component: FormAgregarComponent;
  let fixture: ComponentFixture<FormAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
