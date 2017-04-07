import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-top',
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.less']
})
export class BackTopComponent implements OnInit {
  showBack = false;
  constructor() { }

  ngOnInit() {
  }

}
