import { UserService } from './../../services/user/user.service';
import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit, OnDestroy {
  message: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private userService: UserService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.userService.onUserChange$.subscribe(async () => {
        console.log('authmponent sbu');
        await this.userService.getUserData();
        this.handleAuthentication();
      })
    );
    this.handleAuthentication();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private handleAuthentication() {
    const currentMessage: string | null = localStorage.getItem('authError');
    if (currentMessage) {
      this.message = currentMessage;
    } else {
      this.ngZone.run(() => this.router.navigateByUrl('/overview'));
    }
  }
}
