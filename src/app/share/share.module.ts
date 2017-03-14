
import { StorageService } from './storage.service';
import { ResolverService } from './resolver.service';
import { ApiService } from './api.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    StorageService,
    ResolverService
  ],
  declarations: []
})
export class ShareModule { }
