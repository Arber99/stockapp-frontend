import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'comp-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  private routeSub: Subscription = new Subscription;
  id: string = '';

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
}
