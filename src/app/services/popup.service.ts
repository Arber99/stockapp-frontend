import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor() { }

  popup: BehaviorSubject<string> = new BehaviorSubject('');

}
