import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ProductListComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }
}
