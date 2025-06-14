import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PublicacionesComponent } from '../../components/publicaciones/publicaciones.component';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, PublicacionesComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  seccionActual: string = 'dashboard';

  cambiarSeccion(seccion: string) {
    this.seccionActual = seccion;
  }
}