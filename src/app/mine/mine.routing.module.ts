import { TakecommentsComponent } from './takecomments/takecomments.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MembersComponent } from './members/members.component';
import { ProblemComponent } from './problem/problem.component';
import { GrowthComponent } from './growth/growth.component';
import { PointComponent } from './point/point.component';
import { CommentComponent } from './comment/comment.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AppSetComponent } from './app-set/app-set.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { UserTopicComponent } from './user-topic/user-topic.component';
import { MessageComponent } from './message/message.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ProposalComponent } from './proposal/proposal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OrderComponent } from './order/order.component';
import { SetComponent } from './set/set.component';
import { HasGuideGuard } from './../share/guard/has-guide.guard';
import { GuideComponent } from './guide/guide.component';
import { PlusAddressComponent } from './plus-address/plus-address.component';
import { AddressComponent } from './address/address.component';
import { IndexComponent } from './index/index.component';
import { ResolverService } from './../share/service/resolver.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const mineRoutes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'address/:id',
    component: AddressComponent,
    data: {
      api: '/api/account/address/',
    },
    resolve: {
      content: ResolverService
    }
  },
  {
    path: 'plus-address',
    component: PlusAddressComponent
  },
  {
    path: 'guide',
    component: GuideComponent,
    canActivate: [HasGuideGuard],
    data: {
      api: '/api/branch/guideinfo',
      ajaxNeedUserId: true
    },
    resolve: {
      content: ResolverService
    }
  },
  {
    path: 'problem/:id',
    component: ProblemComponent
  },
  {
    path: 'set',
    component: SetComponent
  },
  {
    path: 'order',
    component: OrderComponent,
    data: {
      api: '/api/order/list',
      ajaxNeedUserId: true
    },
    resolve: {
      content: ResolverService
    }
  },
  {
    path: 'userTopic',
    component: UserTopicComponent
  },
  {
    path: 'proposal',
    component: ProposalComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: 'message',
    component: MessageComponent
  },
  {
    path: 'message-detail/:type',
    component: MessageDetailComponent
  },
  {
    path: 'app-set',
    component: AppSetComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'comment',
    component: CommentComponent
  },
  {
    path: 'point',
    component: PointComponent
  },
  {
    path: 'growth',
    component: GrowthComponent
  },
  {
    path: 'members',
    component: MembersComponent,
    data: {
      api: '/api/account/users',
      ajaxNeedUserId: true
    },
    resolve: {
      content: ResolverService
    }
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'takecomments/:id',
    component: TakecommentsComponent,
    data: {
      api: '/api/order/detail/'
    },
    resolve: {
      content: ResolverService
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mineRoutes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class MineRoutingModule { }
