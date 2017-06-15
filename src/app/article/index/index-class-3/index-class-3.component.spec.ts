import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexClass3Component } from './index-class-3.component';

describe('IndexClass3Component', () => {
  let component: IndexClass3Component;
  let fixture: ComponentFixture<IndexClass3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexClass3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexClass3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
