import { StorageService } from './../../service/storage.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent implements OnInit {
  @Input () isloading;
  @Input () ispanning;
  constructor(
    private storage: StorageService
  ) { }

  ngOnInit() {

  }

}
