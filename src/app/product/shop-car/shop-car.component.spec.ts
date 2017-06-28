import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCarComponent } from './shop-car.component';

describe('ShopCarComponent', () => {
  let component: ShopCarComponent;
  let fixture: ComponentFixture<ShopCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
