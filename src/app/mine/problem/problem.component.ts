import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './../../share/service/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.less']
})
export class ProblemComponent implements OnInit {
  detail: any;

  constructor(
    public storage: StorageService,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    const problems = this.storage.get('problems');
    this.activeRoute.params
      .subscribe(res => {
        for (let index = 0; index < problems.length; index++) {
          if (parseInt(res.id, 10) === problems[index].id) {
            this.detail = this.sanitizer.bypassSecurityTrustHtml(problems[index].detail);
            return;
          }
        }
      });
  }

}
