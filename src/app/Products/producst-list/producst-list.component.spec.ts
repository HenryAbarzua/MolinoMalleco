import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducstListComponent } from './producst-list.component';

describe('ProducstListComponent', () => {
  let component: ProducstListComponent;
  let fixture: ComponentFixture<ProducstListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducstListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducstListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
