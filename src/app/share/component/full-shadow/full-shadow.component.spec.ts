import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullShadowComponent } from './full-shadow.component';

describe('FullShadowComponent', () => {
  let component: FullShadowComponent;
  let fixture: ComponentFixture<FullShadowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullShadowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullShadowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
