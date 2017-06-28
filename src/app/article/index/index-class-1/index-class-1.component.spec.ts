import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexClass1Component } from './index-class-1.component';

describe('IndexClass1Component', () => {
  let component: IndexClass1Component;
  let fixture: ComponentFixture<IndexClass1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexClass1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexClass1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
