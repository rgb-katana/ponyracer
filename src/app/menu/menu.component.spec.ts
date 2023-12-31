import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { MenuComponent } from './menu.component';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';

describe('MenuComponent', () => {
  const userService = {
    userEvents: new Subject<UserModel>(),
    logout: () => {}
  } as UserService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: UserService, useValue: userService }]
    })
  );

  it('should have a `navbarCollapsed` field', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    expect(fixture.componentInstance.navbarCollapsed)
      .withContext(
        'Check that `navbarCollapsed` is initialized with `true`. Maybe you forgot to declare `navbarCollapsed` in your component.'
      )
      .toBe(true);
  });

  it('should have a `toggleNavbar` method', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    expect(fixture.componentInstance.toggleNavbar).withContext('Maybe you forgot to declare a `toggleNavbar()` method').not.toBeNull();

    fixture.componentInstance.toggleNavbar();

    expect(fixture.componentInstance.navbarCollapsed)
      .withContext('`toggleNavbar()` should change `navbarCollapsed` from `true` to `false`')
      .toBe(false);

    fixture.componentInstance.toggleNavbar();

    expect(fixture.componentInstance.navbarCollapsed)
      .withContext('`toggleNavbar()` should change `navbarCollapsed` from false to true`')
      .toBe(true);
  });

  it('should toggle the class on click', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    const element = fixture.nativeElement;

    fixture.detectChanges();

    const navbarCollapsed = element.querySelector('#navbar');
    expect(navbarCollapsed).withContext('No element with the id `#navbar`').not.toBeNull();
    expect(navbarCollapsed.classList)
      .withContext('The element with the id `#navbar` should have the class `collapse`')
      .toContain('collapse');

    const button = element.querySelector('button');
    expect(button).withContext('No `button` element to collapse the menu').not.toBeNull();
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    const navbar = element.querySelector('#navbar');
    expect(navbar.classList)
      .withContext('The element with the id `#navbar` should have not the class `collapse` after a click')
      .not.toContain('collapse');
  });

  it('should use routerLink to navigate', () => {
    const fixture = TestBed.createComponent(MenuComponent);

    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(links.length).withContext('You should have only one routerLink to the home when the user is not logged').toBe(1);

    fixture.componentInstance.user = { login: 'cedric', money: 200 } as UserModel;
    fixture.detectChanges();

    const linksAfterLogin = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(linksAfterLogin.length).withContext('You should have two routerLink: one to the races, one to the home').toBe(2);
  });

  it('should listen to userEvents', () => {
    const fixture = TestBed.createComponent(MenuComponent);

    const user = { login: 'cedric', money: 200 } as UserModel;

    userService.userEvents.next(user);

    expect(fixture.componentInstance.user).withContext('Your component should listen to the `userEvents` observable').toBe(user);
  });

  it('should display the user if logged', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    component.user = { login: 'cedric', money: 200 } as UserModel;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const info = element.querySelector('#current-user');
    expect(info).withContext('You should have a `span` element with the ID `current-user` to display the user info').not.toBeNull();
    expect(info.textContent).withContext('You should display the name of the user in a `span` element').toContain('cedric');
    expect(info.textContent).withContext('You should display the score of the user in a `span` element').toContain('200');
  });

  it('should unsubscribe on destruction', () => {
    const userService = TestBed.inject(UserService);
    const fixture = TestBed.createComponent(MenuComponent);
    expect(userService.userEvents.observed).withContext('You need to subscribe to userEvents when the component is created').toBeTrue();
    fixture.destroy();

    expect(userService.userEvents.observed)
      .withContext('You need to unsubscribe from userEvents when the component is destroyed')
      .toBeFalse();
  });

  it('should display a logout button', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    const component = fixture.componentInstance;
    component.user = { login: 'cedric', money: 200 } as UserModel;
    fixture.detectChanges();
    spyOn(fixture.componentInstance, 'logout');

    const element = fixture.nativeElement;
    const logout = element.querySelector('span.fa-power-off');
    expect(logout).withContext('You should have a span element with a class `fa-power-off` to log out').not.toBeNull();
    logout.dispatchEvent(new Event('click', { bubbles: true }));

    fixture.detectChanges();
    expect(fixture.componentInstance.logout).toHaveBeenCalled();
  });

  it('should stop the click event propagation', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    const fixture = TestBed.createComponent(MenuComponent);
    const event = new Event('click');
    spyOn(userService, 'logout');
    spyOn(event, 'preventDefault');
    fixture.componentInstance.logout(event);

    expect(userService.logout).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
