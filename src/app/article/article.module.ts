import { DialogService } from './../share/service/dialog.service';
import { ArticleIndexClass1Component } from './index/index-class-1/index-class-1.component';
import { ArticleIndexClass2Component } from './index/index-class-2/index-class-2.component';
import { ArticleIndexClass3Component } from './index/index-class-3/index-class-3.component';
import { ArticleIndexClass0Component } from './index/index-class-0/index-class-0.component';
import { ArticleListComponent } from './list/list.component';
import { ArticleDetailComponent } from './detail/detail.component';
import { ArticleIndexComponent } from './index/index.component';
import { ArticleRoutModule } from './article.routing.module';
import { ShareModule } from './../share/share.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    LazyLoadImageModule,
    ArticleRoutModule,
  ],
  declarations: [
    ArticleIndexComponent,
    ArticleDetailComponent,
    ArticleListComponent,
    ArticleIndexClass0Component,
    ArticleIndexClass1Component,
    ArticleIndexClass2Component,
    ArticleIndexClass3Component
  ],
  providers: [DialogService]
})
export class ArticleModule { }
