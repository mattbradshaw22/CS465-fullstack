import { Inject, Injectable, signal } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripData } from '../services/trip-data';


@Injectable({
  providedIn: 'root',
})
export class Authentication {

  private token = signal<string>('');

// Setup our storage and service access
constructor(
  @Inject(BROWSER_STORAGE) private storage: Storage,
  private tripData: TripData
) { 
  this.token.set(this.storage.getItem('travlr-token') || '');
}

  // Variable to handle Authentication Responses
  authResp: AuthResponse = new AuthResponse();

  // GET our token from our storage provider.
  // NOTE: For this application we have decided that we will name
  // the key for our token 'travlr-token'
  public getToken(): string {
    return this.token();
  }

  // Save our token to our storage provider
  // NOTE: For this application we have decided that we will name
  // the key for our token 'travlr-token'
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
    this.token.set(token);
  }

  // Logout of our application and remove the JWT from storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
    this.token.set('');
  }

  // Boolean to determine if we are logged in and the token is
  // still valid. Even if we have a token we will still have to
  // reauthenticate if the token has expired
  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  // Retrieve the current user. this function should only be called
  // after the calling method has checked to make sure that the user
  // isLoggedIn
  public getCurrentUser(): User {
    const token = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // Login method that leverages the login method in tripData
  // because that method returns an observable, we subscribe to the 
  // result and only process when the Observable condition is satisfied
  // Uncomment the two console logs below for additional debugging info
  public login(user: User, passwd: string) : void {
    this.tripData.login(user,passwd)
    .subscribe({
      next: (value: any) => {
        if(value)
        {
          console.log(value);
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }

  // Register method that leverages the register method in tripData
  // because that method returns an observable, we subscribe to the 
  // result and only process when the Observable condition is satisfied
  // Uncomment the two console logs below for additional debugging info
  // NOTE: this method is nearly identical to the register method as the API behavior 
  // logs a user in upon registration
  public register(user: User, passwd: string) : void {
    this.tripData.register(user,passwd)
    .subscribe({
      next: (value: any) => {
        if(value)
        {
          console.log(value);
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  } 
}

