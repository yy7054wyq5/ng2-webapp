import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() hasCar;
  @Input() hasBack;
  constructor(
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
  }

}
