import { Component, OnInit } from '@angular/core';
import { ConsoleToggleService } from './services/ConsoleToggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private consoleToggleService: ConsoleToggleService) {}
  ngOnInit(): void {
    this.consoleToggleService.disableConsoleInProduction();
  }
}
