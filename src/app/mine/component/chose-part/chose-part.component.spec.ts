import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosePartComponent } from './chose-part.component';

describe('ChosePartComponent', () => {
  let component: ChosePartComponent;
  let fixture: ComponentFixture<ChosePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChosePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
