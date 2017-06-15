import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  appTag: string = window['appTag'];
  app: object = window['appInfo'];
  constructor() { }

  ngOnInit() {}

}
