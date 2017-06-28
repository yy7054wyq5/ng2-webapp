import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadAndRefreshComponent } from './load-and-refresh.component';

describe('LoadAndRefreshComponent', () => {
  let component: LoadAndRefreshComponent;
  let fixture: ComponentFixture<LoadAndRefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadAndRefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadAndRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
