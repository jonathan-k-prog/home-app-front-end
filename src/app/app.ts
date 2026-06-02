import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonNavBarComponent} from './features/common/nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonNavBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
