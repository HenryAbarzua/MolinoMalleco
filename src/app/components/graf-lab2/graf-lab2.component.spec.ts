import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafLab2Component } from './graf-lab2.component';

describe('GrafLab2Component', () => {
  let component: GrafLab2Component;
  let fixture: ComponentFixture<GrafLab2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafLab2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafLab2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
