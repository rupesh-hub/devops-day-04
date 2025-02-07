import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {ListJobComponent} from "./job/list-job/list-job.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ListJobComponent, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet />
  `,
  styles: [

  ]
})
export class AppComponent {
}
