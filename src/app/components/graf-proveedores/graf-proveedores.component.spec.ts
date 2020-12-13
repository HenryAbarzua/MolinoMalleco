import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafProveedoresComponent } from './graf-proveedores.component';

describe('GrafProveedoresComponent', () => {
  let component: GrafProveedoresComponent;
  let fixture: ComponentFixture<GrafProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
