import { Component, AnimationTransitionEvent } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _opened = false;
  private _toggleOpened(): void {
    this._opened = !this._opened;
  }
}
