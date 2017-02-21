import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../service/hero.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  providers: [HeroService, StorageService]
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
    private storage: StorageService
  ) { };
  testGet(): Promise<any> {
    return this.http.get('/api/app/info/11?sign=beb790d872f5b20202c7d4e98119c54d&timeout=5000')
      .toPromise()
      .then(res => {
        return res.json();
      });
  };
  ngOnInit() {

    this.testGet()
      .then(res => {
        console.log(res);
        if (res.success) {
          alert(res.msg);
          this.storage.put({
            type: 'local',
            key: 'appinfo',
            data: res.content
          });
          console.log(this.storage.get('appinfo'));
          setTimeout(() => {
            this.storage.remove('appinfo');
          }, 1000);
        }
      });

  }

}
