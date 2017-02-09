import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  heroes;
  title = 'ng2 works!';
  ngOnInit() {
    this.heroes = [
      {
        id:1,
        name:'chaoren',
      },
      {
        id:2,
        name:'leishen',
      }
    ];
  }

}
