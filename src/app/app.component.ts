import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RemService } from './rem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers:[RemService]
})
export class AppComponent implements OnInit  {//生命周期钩子

  constructor(
    private rem: RemService
  ){}

  ngOnInit() {
    this.rem.setDpr();
  }
}
