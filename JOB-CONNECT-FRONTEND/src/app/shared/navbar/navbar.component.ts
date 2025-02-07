import { Component } from '@angular/core';
import {AuthenticationService} from "../../user/authentication-service.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  logo: string  = 'assets/logo.png';
  constructor(public authService: AuthenticationService) {}


}
