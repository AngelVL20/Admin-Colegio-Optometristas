import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { ComiteComponent } from './components/comite/comite.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    DashboardComponent,
    PublicacionesComponent,
    ComiteComponent,
    ContactoComponent,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeSection: string =
    localStorage.getItem('logueado') === 'true' ? 'dashboard' : 'login';

  cambiarSeccion(seccion: string) {
    if (seccion === 'logout') {
      const confirmar = confirm('¿Estás seguro de que deseas cerrar sesión?');
      if (confirmar) {
        localStorage.removeItem('logueado');
        this.activeSection = 'login';
      }
    } else {
      this.activeSection = seccion;
    }
  }

  onLoginSuccess() {
    this.activeSection = 'dashboard';
  }
}
