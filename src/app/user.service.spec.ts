import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { UserModel } from './models/user.model';

describe('UserService', () => {
  let userService: UserService;
  let http: HttpTestingController;

  const user = {
    id: 1,
    login: 'cedric',
    money: 1000,
    registrationInstant: '2015-12-01T11:00:00Z',
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
  );

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  afterAll(() => http.verify());

  it('should register a user', () => {
    let actualUser: UserModel | undefined;
    userService.register(user.login, 'password', 1986).subscribe(fetchedUser => (actualUser = fetchedUser));

    const req = http.expectOne({ method: 'POST', url: 'https://ponyracer.ninja-squad.com/api/users' });
    expect(req.request.body).toEqual({ login: user.login, password: 'password', birthYear: 1986 });
    req.flush(user);

    expect(actualUser).withContext('You should emit the user.').toBe(user);
  });

  it('should authenticate a user', () => {
    // spy on the store method
    spyOn(userService, 'storeLoggedInUser');

    const credentials = { login: 'cedric', password: 'hello' };
    let actualUser: UserModel | undefined;
    userService.authenticate(credentials).subscribe(fetchedUser => (actualUser = fetchedUser));

    const req = http.expectOne({ method: 'POST', url: 'https://ponyracer.ninja-squad.com/api/users/authentication' });
    expect(req.request.body).toEqual(credentials);
    req.flush(user);

    expect(actualUser).withContext('The observable should emit the user').toBe(user);
    expect(userService.storeLoggedInUser).toHaveBeenCalledWith(user);
  });

  it('should store the logged in user', () => {
    spyOn(userService.userEvents, 'next');
    spyOn(Storage.prototype, 'setItem');

    userService.storeLoggedInUser(user);

    expect(userService.userEvents.next).toHaveBeenCalledWith(user);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('rememberMe', JSON.stringify(user));
  });

  it('should retrieve a user if one is stored', () => {
    spyOn(userService.userEvents, 'next');
    spyOn(Storage.prototype, 'getItem').and.returnValue(JSON.stringify(user));

    userService.retrieveUser();

    expect(userService.userEvents.next).toHaveBeenCalledWith(user);
  });

  it('should retrieve no user if none stored', () => {
    spyOn(userService.userEvents, 'next');
    spyOn(Storage.prototype, 'getItem').and.returnValue(null);

    userService.retrieveUser();

    expect(userService.userEvents.next).not.toHaveBeenCalled();
  });

  it('should logout the user', () => {
    spyOn(userService.userEvents, 'next');
    spyOn(Storage.prototype, 'removeItem');

    userService.logout();

    expect(userService.userEvents.next).toHaveBeenCalledWith(null);
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('rememberMe');
  });
});
