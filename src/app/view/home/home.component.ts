import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HeroService]
})
export class HomeComponent implements OnInit {
  heroes;
  folders;
  notes;
  res;
  title = 'Heroes List!';
  constructor(
    private HeroService: HeroService,
    private http: Http,
  ){}
  
  testGet(): Promise<any>{
    return this.http.get('/api/purchaseParts/getList?fromSys=scmpcapp&lang=zh&pageIndex=1&pageSize=10&token=06dcc3580eaaa25a045b6559f8c0509e')
      .map(response =>{
        return response.json().data;
      })
      .toPromise()
  };

  ngOnInit() {

    this.testGet();

  }

}
