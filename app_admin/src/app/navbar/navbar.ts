import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Authentication } from '../services/authentication';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  constructor(
    private authentication: Authentication,
    private router: Router
  ) { }

  ngOnInit() { }

  public isLoggedIn(): boolean {
    return this.authentication.isLoggedIn();
  }

  public onLogout(): void {
    this.authentication.logout();
    this.router.navigate(['']);    
  }
}
