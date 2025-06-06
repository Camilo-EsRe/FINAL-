import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- ¡IMPORTANTE para *ngIf!
import { FormsModule } from '@angular/forms';   // <-- ¡IMPORTANTE para [(ngModel)]!
import { Router } from '@angular/router';       // Necesario si vas a navegar programáticamente
import { RouterLink } from '@angular/router';   // <-- ¡IMPORTANTE para routerLink en el template!

// Si ya creaste tu servicio de autenticación, descomenta la siguiente línea y ajusta la ruta
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html', // Apunta a tu archivo HTML
  styleUrls: ['./register.component.css'],   // Apunta a tu archivo CSS
  standalone: true, // Indica que este es un componente standalone
  imports: [
    CommonModule,  // Módulo que provee *ngIf, *ngFor, etc.
    FormsModule,   // Módulo que provee [(ngModel)]
    RouterLink     // Módulo que provee la directiva routerLink
  ]
})
export class RegisterComponent {
  // Propiedades para almacenar los datos del formulario
  user = {
    email: '',
    password: ''
  };

  // Propiedades para mostrar mensajes al usuario
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private router: Router, // Inyecta el servicio Router para la navegación
    // private authService: AuthService // Descomenta esta línea si ya tienes tu AuthService
  ) {}

  // Método que se llama cuando el formulario es enviado
  onSubmit(): void {
    console.log('Datos de registro:', this.user);

    // Aquí iría la lógica REAL para llamar a tu backend
    // a través de tu AuthService, por ejemplo:
    /*
    this.authService.register(this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.successMessage = '¡Registro exitoso! Ahora puedes iniciar sesión.';
        this.errorMessage = null;
        // Opcional: limpiar el formulario
        this.user.email = '';
        this.user.password = '';
        // Opcional: redirigir al login después de un breve retraso
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error de registro:', err);
        // Maneja el error, mostrando un mensaje al usuario
        this.errorMessage = err.error?.message || 'Error al registrarse. Inténtalo de nuevo.';
        this.successMessage = null;
      }
    });
    */

    // --- Lógica de ejemplo/simulada (BORRAR cuando uses el servicio real) ---
    if (this.user.email && this.user.password) {
      this.errorMessage = null;
      this.successMessage = '¡Registro exitoso (simulado)! Redirigiendo a Iniciar Sesión...';
      this.user.email = ''; // Limpiar el formulario después del "registro"
      this.user.password = '';
      setTimeout(() => {
        this.router.navigate(['/login']); // Redirigir al login
      }, 2000);
    } else {
      this.errorMessage = 'Por favor, introduce tu email y contraseña.';
      this.successMessage = null;
    }
    // --- Fin de la lógica de ejemplo ---
  }
}