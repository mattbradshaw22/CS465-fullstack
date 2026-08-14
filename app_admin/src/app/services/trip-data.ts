import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

import { Trip } from '../models/trip';


@Injectable({
  providedIn: 'root',
})

export class TripData {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
    ) {}
  baseurl = 'http://localhost:3000/api/';
  url = 'http://localhost:3000/api/trips';

  // Call to our /login endpoint, returns JWT
  login(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripData::login');
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Call to our /register endpoint, creates user and returns JWT
  register(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripData::register');
    return this.handleAuthAPICall('register', user, passwd);
  }

  // Helper method to process both login and register methods
  handleAuthAPICall(
    endpoint: string,
    user: User,
    passwd: string
  ): Observable<AuthResponse> {
    // console.log('Inside TripData::handleAuthAPICall');
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(
      this.baseurl + endpoint,
      formData
    );
  }

  getTrips() : Observable<Trip[]> {
    // console.log('Inside TripData::getTrips');
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip): Observable<Trip> {
    // console.log('Inside TripData::addTrip');
        return this.http.post<Trip>(this.url, formData);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    // console.log('Inside TripData::getTrips');
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    // console.log('Inside TripData::updateTrip');
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }

  deleteTrip(tripCode: string) : Observable<Trip> {
    // console.log('Inside TripData::deleteTrip');
    return this.http.delete<Trip>(this.url + '/' + tripCode);
  }
}
