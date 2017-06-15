import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTopicComponent } from './item-topic.component';

describe('ItemTopicComponent', () => {
  let component: ItemTopicComponent;
  let fixture: ComponentFixture<ItemTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
