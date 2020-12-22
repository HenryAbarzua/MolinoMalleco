import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafLabComponent } from './graf-lab.component';

describe('GrafLabComponent', () => {
  let component: GrafLabComponent;
  let fixture: ComponentFixture<GrafLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
