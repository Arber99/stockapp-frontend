import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comp-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss'],
})
export class CookieBannerComponent implements OnInit {
  hasCookieBanner = true;
  hasInformationToggled = false;

  ngOnInit() {
    if (localStorage.getItem('cookies') === 'confirmed') {
      this.hasCookieBanner = false;
    }
  }

  toggleInformation() {
    this.hasInformationToggled = !this.hasInformationToggled
  }

  confirm() {
    localStorage.setItem('cookies', 'confirmed');
    this.hasCookieBanner = false;
  }
}
