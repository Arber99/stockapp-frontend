import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'comp-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  private routeSub: Subscription = new Subscription;
  id: string = '';

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
}
