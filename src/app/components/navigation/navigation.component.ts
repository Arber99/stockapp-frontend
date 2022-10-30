import { Component } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'comp-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
}
