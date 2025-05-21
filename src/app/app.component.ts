import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, NgIf]
})
export class AppComponent {
  title = 'tsa-submissions-coding-ui';
  theme: 'light' | 'dark' = 'light';

  constructor(private renderer: Renderer2) {
    // Detect system/browser theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.theme = prefersDark ? 'dark' : 'light';
    this.setTheme(this.theme);

    // Listen for changes in system/browser theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      this.theme = newTheme;
      this.setTheme(newTheme);
    });
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(this.theme);
  }

  setTheme(theme: 'light' | 'dark') {
    this.renderer.setAttribute(document.body, 'data-theme', theme);
  }
}
