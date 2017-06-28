import { DialogService } from './../share/service/dialog.service';
import { TopicEditComponent } from './edit/edit.component';
import { SublistComponent } from './sublist/sublist.component';
import { CommunityRoutModule } from './community.routing.module';
import { CommunityIndexComponent } from './index/index.component';
import { ShareModule } from './../share/share.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TopicDetailComponent } from './detail/detail.component'; // 图片懒加载模块
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    LazyLoadImageModule,
    CommunityRoutModule,
    FileUploadModule
  ],
  declarations: [
    CommunityIndexComponent,
    SublistComponent,
    TopicEditComponent,
    TopicDetailComponent,
  ],
  providers: [DialogService]
})
export class CommunityModule { }
