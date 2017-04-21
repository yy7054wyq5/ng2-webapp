import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackTopComponent } from './back-top/back-top.component';
import { MdAutocompleteModule, MdCheckboxModule, MdCardModule } from '@angular/material';
import { RefreshComponent } from './refresh/refresh.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdAutocompleteModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    BackTopComponent,
    RefreshComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    BackTopComponent,
    MdAutocompleteModule,
    MdCardModule,
    MdCheckboxModule,
    RefreshComponent
  ]
})
export class ComponentModule { }
