import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseGuideComponent } from './choose-guide.component';

describe('ChooseGuideComponent', () => {
  let component: ChooseGuideComponent;
  let fixture: ComponentFixture<ChooseGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
