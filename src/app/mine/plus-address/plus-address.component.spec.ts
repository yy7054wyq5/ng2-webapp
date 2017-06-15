import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusAddressComponent } from './plus-address.component';

describe('PlusAddressComponent', () => {
  let component: PlusAddressComponent;
  let fixture: ComponentFixture<PlusAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlusAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
