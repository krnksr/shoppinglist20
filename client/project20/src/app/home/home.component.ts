import { Component } from '@angular/core';
import { AuthService} from "../shared/authentication.service";


@Component({
  selector: 'bs-root',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  constructor(private authService: AuthService) {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
