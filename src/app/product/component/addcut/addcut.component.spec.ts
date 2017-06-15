import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcutComponent } from './addcut.component';

describe('AddcutComponent', () => {
  let component: AddcutComponent;
  let fixture: ComponentFixture<AddcutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
