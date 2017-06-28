import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexClass0Component } from './index-class-0.component';

describe('IndexClass0Component', () => {
  let component: IndexClass0Component;
  let fixture: ComponentFixture<IndexClass0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexClass0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexClass0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
