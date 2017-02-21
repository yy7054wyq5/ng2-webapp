import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../service/hero.service';
import { storageService } from '../../service/storage.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  providers: [HeroService,storageService]
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
    private localData: storageService
  ){}
  
  testGet(): Promise<any>{
    return this.http.get('/api/app/info/11?sign=beb790d872f5b20202c7d4e98119c54d&timeout=5000')
      .toPromise()
      .then(res =>{
        return res.json();
      })
  };

  ngOnInit() {

    this.testGet()
      .then(res =>{
        console.log(res);
        if(res.success){
          alert(res.msg);
          this.localData.put('appinfo',res.content);
          console.log(this.localData.get('appinfo'));
        }
      });

  }

}
