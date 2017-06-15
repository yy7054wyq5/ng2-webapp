import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCommentListComponent } from './topic-comment-list.component';

describe('TopicCommentListComponent', () => {
  let component: TopicCommentListComponent;
  let fixture: ComponentFixture<TopicCommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicCommentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
