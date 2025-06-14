import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = '';
  contrasena = '';
  mostrarPassword = false;
  recordar = false;

  @Output() loginExitoso = new EventEmitter<void>();

  iniciarSesion() {
    if (this.usuario && this.contrasena) {
      localStorage.setItem('logueado', 'true');
      this.loginExitoso.emit();
    } else {
      alert('Por favor completa todos los campos.');
    }
  }
}
