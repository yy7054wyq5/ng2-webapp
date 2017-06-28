import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakecommentsComponent } from './takecomments.component';

describe('TakecommentsComponent', () => {
  let component: TakecommentsComponent;
  let fixture: ComponentFixture<TakecommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakecommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakecommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
