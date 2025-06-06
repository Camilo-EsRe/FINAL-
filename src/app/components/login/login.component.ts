import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf
import { FormsModule } from '@angular/forms';   // Necesario para [(ngModel)]
import { Router } from '@angular/router';       // Necesario para la navegación programática
import { RouterLink } from '@angular/router';   // Necesario para routerLink en el template

// IMPORTANTE: Si tienes un servicio de autenticación, impórtalo aquí
// import { AuthService } from '../../services/auth.service'; // Ajusta la ruta si es diferente

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Esto indica que es un componente standalone
  imports: [
    CommonModule,  // Proporciona *ngIf, *ngFor, etc.
    FormsModule,   // Proporciona [(ngModel)]
    RouterLink     // Proporciona la directiva routerLink
  ]
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  errorMessage: string | null = null; // Puede ser un string o null

  constructor(
    private router: Router,
    // private authService: AuthService // Descomenta si usas un servicio de autenticación
  ) {}

  onSubmit(): void {
    // Aquí iría la lógica para enviar los datos de inicio de sesión al backend
    console.log('Datos de inicio de sesión:', this.user);

    // Ejemplo de cómo manejarías el login con un servicio:
    /*
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        this.errorMessage = null; // Limpiar cualquier mensaje de error anterior
        this.router.navigate(['/contacts']); // Redirigir a la página de contactos
      },
      error: (err) => {
        console.error('Error de inicio de sesión:', err);
        this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
        // O: this.errorMessage = err.error?.message || 'Error desconocido';
      }
    });
    */

    // Lógica temporal si no tienes el servicio de autenticación aún:
    if (this.user.email === 'test@example.com' && this.user.password === 'password') {
      this.errorMessage = null;
      alert('Inicio de sesión exitoso (simulado)!');
      this.router.navigate(['/contacts']); // Redirigir
    } else {
      this.errorMessage = 'Email o contraseña incorrectos.';
    }
  }
}