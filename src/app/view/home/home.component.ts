import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  providers: [StorageService, ApiService]
})
export class HomeComponent implements OnInit {
  info;
  constructor(
    private storage: StorageService,
    private api: ApiService
  ) { };

  ngOnInit() {
    this.api.ajax({
      method: 'get',
      url: '/api/app/info/11',
      body: {
        sign: 'beb790d872f5b20202c7d4e98119c54d'
      }
    })
    .subscribe(
      (res) => {
        this.info = res.content;
      }
    );
  }

}
