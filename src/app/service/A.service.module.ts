import { AppInfoService } from './app-info.service';
import { LoadingService } from './loading.service';
import { CacheService } from './cache.service';
import { RemService } from './rem.service';
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
    ResolverService,
    RemService,
    CacheService,
    AppInfoService,
    LoadingService
  ],
  declarations: []
})
export class ServiceModule { }
