import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit {
  message: string = '';

  constructor(private router: Router, private userService: UserService) {
    this.userService.onUserChange$.subscribe( async () => {
      await this.userService.getUserData();
      this.handleAuthentication();
    });
  }

  ngOnInit(): void {
    this.handleAuthentication();
  }

  private handleAuthentication() {
    const currentMessage: string | null = localStorage.getItem('authError');
    if (currentMessage) {
      this.message = currentMessage;
    } else {
      this.router.navigateByUrl('/overview');
    }
  }
}
