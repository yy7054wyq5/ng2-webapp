import { ArticleDetailComponent } from './detail/detail.component';
import { ArticleListComponent } from './list/list.component';
import { ArticleIndexComponent } from './index/index.component';
import { ResolverService } from '../share/service/resolver.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

const articleRoutes: Routes = [
  {
    path: '',
    component: ArticleIndexComponent,
  },
  {
    path: 'index',
    component: ArticleIndexComponent,
  },
  {
    path: 'articleList/:id/:title',
    component: ArticleListComponent
  },
  {
    path: 'articleDetail/:id',
    component: ArticleDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(articleRoutes),
  ],
  exports: [RouterModule],
  declarations: [

  ],
  providers: [],
})
export class ArticleRoutModule { }
