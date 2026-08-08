import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';


@Component({
  selector: 'app-delete-trip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-trip.html',
  styleUrl: './delete-trip.css',
})
export class DeleteTrip implements OnInit {

  trip!: Trip;
  tripCode: string = '';

  constructor (

    private router: Router,
    private tripData: TripData,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
    const tripCode = localStorage.getItem('tripCode');

    if (!tripCode) {
      alert("Couldn't find the trip code.");
      this.router.navigate(['']);
      return;
    }

    this.tripCode = tripCode;

    this.tripData.getTrip(tripCode).subscribe({
      next: (value: any) => {
        console.log('Retrieved trip:', value);

        this.trip = value[0];

        this.changeDetector.markForCheck();
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }

  public confirmDelete(): void {
    this.tripData.deleteTrip(this.tripCode).subscribe({
      next: () => {
        console.log('Trip deleted: ' + this.tripCode);
        localStorage.removeItem('tripCode');
        this.router.navigate(['']);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }

  public cancel(): void {
    localStorage.removeItem('tripCode');
    this.router.navigate(['']);
  }
} 
