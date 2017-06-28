import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigViewComponent } from './big-view.component';

describe('BigViewComponent', () => {
  let component: BigViewComponent;
  let fixture: ComponentFixture<BigViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
