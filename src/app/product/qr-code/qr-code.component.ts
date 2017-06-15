import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.less']
})
export class QrCodeComponent implements OnInit {
  src: string;
  constructor() { }

  ngOnInit() {
  }

}
