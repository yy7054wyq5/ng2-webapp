import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
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
