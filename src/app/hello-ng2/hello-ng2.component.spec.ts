/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HelloNg2Component } from './hello-ng2.component';

describe('HelloNg2Component', () => {
  let component: HelloNg2Component;
  let fixture: ComponentFixture<HelloNg2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloNg2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloNg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
