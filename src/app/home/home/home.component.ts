import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  appTag = window['appTag'];
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.router.navigateByUrl('index/find');
  }

}
