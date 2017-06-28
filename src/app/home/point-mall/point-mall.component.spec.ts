import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointMallComponent } from './point-mall.component';

describe('PointMallComponent', () => {
  let component: PointMallComponent;
  let fixture: ComponentFixture<PointMallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointMallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointMallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
