import { UserTopicComponent } from './user-topic/user-topic.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ProposalComponent } from './proposal/proposal.component';
import { FormsModule } from '@angular/forms';
import { ShareModule } from './../share/share.module';
import { IndexComponent } from './index/index.component';
import { MineRoutingModule } from './mine.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address/address.component';
import { PlusAddressComponent } from './plus-address/plus-address.component';
import { ChosePartComponent } from './component/chose-part/chose-part.component';
import { GuideComponent } from './guide/guide.component';
import { OrderComponent } from './order/order.component';
import { SetComponent } from './set/set.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { MessageComponent } from './message/message.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { AppSetComponent } from './app-set/app-set.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CommentComponent } from './comment/comment.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PointComponent } from './point/point.component';
import { GrowthComponent } from './growth/growth.component';
import { ProblemComponent } from './problem/problem.component';
import { MembersComponent } from './members/members.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TakecommentsComponent } from './takecomments/takecomments.component';
import { StarComponent } from './component/star/star.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    MineRoutingModule,
    FormsModule,
    FileUploadModule,
    LazyLoadImageModule
  ],
  declarations: [
    IndexComponent,
    AddressComponent,
    PlusAddressComponent,
    ChosePartComponent,
    GuideComponent,
    OrderComponent,
    SetComponent,
    ResetPasswordComponent,
    UserTopicComponent,
    ProposalComponent,
    FeedbackComponent,
    MessageComponent,
    MessageDetailComponent,
    AppSetComponent,
    AboutUsComponent,
    CommentComponent,
    PointComponent,
    GrowthComponent,
    ProblemComponent,
    MembersComponent,
    CalendarComponent,
    TakecommentsComponent,
    StarComponent
  ]
})
export class MineModule { }
