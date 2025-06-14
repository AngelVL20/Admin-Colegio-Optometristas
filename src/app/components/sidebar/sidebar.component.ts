import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class SidebarComponent {
  @Output() seccionCambiada = new EventEmitter<string>();
  seccionActiva: string = 'dashboard';

  seleccionar(seccion: string) {
    this.seccionActiva = seccion;
    this.seccionCambiada.emit(seccion);
  }
}
