import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './pages/home/home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home],
  template: `
    <div class="app-container">
      <div class="floating-shapes">
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <div class="app-content page-transition">
        <app-home></app-home>
      </div>
    </div>
  `,
  styleUrls: ['./app.scss'],
})
export class App {
  protected title = 'ToDo-Angular';
}
