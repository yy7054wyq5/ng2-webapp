import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SublistComponent } from './sublist.component';

describe('SublistComponent', () => {
  let component: SublistComponent;
  let fixture: ComponentFixture<SublistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SublistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SublistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
