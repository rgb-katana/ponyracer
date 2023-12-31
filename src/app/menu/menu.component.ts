import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'pr-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  navbarCollapsed = true;
  user: UserModel | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.userService.userEvents.pipe(takeUntilDestroyed()).subscribe(user => (this.user = user));
  }

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event: Event) {
    event.preventDefault();
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
