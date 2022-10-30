import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'comp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor() {}

  @Input()
  id: string = '';

  ngOnInit(): void {}
}
