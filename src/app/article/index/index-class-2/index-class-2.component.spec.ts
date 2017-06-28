import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexClass2Component } from './index-class-2.component';

describe('IndexClass2Component', () => {
  let component: IndexClass2Component;
  let fixture: ComponentFixture<IndexClass2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexClass2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexClass2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
