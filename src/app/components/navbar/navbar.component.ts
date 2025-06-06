// src/app/components/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService, // Hacemos el servicio público para acceder a isLoggedIn() en el template
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirigir al login después del logout
  }
}