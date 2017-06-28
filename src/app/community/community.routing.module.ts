import { IsLoginGuard } from './../share/guard/is-login.guard';
import { TopicDetailComponent } from './detail/detail.component';
import { TopicEditComponent } from './edit/edit.component';
import { SublistComponent } from './sublist/sublist.component';
import { CommunityIndexComponent } from './index/index.component';
import { ResolverService } from '../share/service/resolver.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

const communityRoutes: Routes = [
  {
    path: '',
    component: CommunityIndexComponent,
  },
  {
    path: 'index',
    component: CommunityIndexComponent,
  },
  {
    path: 'sublist/:id',
    component: SublistComponent
  },
  {
    path: 'topicEdit/:id',
    component: TopicEditComponent,
    canActivate: [IsLoginGuard]
  },
  {
    path: 'topicDetail/:id',
    component: TopicDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(communityRoutes),
  ],
  exports: [RouterModule],
  declarations: [

  ],
  providers: [],
})
export class CommunityRoutModule { }
