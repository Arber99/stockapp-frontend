import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Stockify';

  constructor() {}

  onActivate(e: Event) {
    // window.scroll(0,0);
 
    window.scroll({ 
            top: 0, 
            left: 0, 
     });
 
 }

}
