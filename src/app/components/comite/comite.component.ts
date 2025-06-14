import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comite.component.html',
  styleUrls: ['./comite.component.css'],
})
export class ComiteComponent {
  mostrarFormulario = false;
  editandoIndice: number | null = null;

  nuevoMiembro = {
    nombre: '',
    correo: '',
    rol: '',
  };

  comite: any[] = [];

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) this.resetFormulario();
  }

  agregarOModificarMiembro() {
    if (this.editandoIndice === null) {
      this.comite.push({ ...this.nuevoMiembro });
    } else {
      this.comite[this.editandoIndice] = { ...this.nuevoMiembro };
    }
    this.toggleFormulario();
  }

  editarMiembro(indice: number) {
    this.nuevoMiembro = { ...this.comite[indice] };
    this.editandoIndice = indice;
    this.mostrarFormulario = true;
  }

  eliminarMiembro(indice: number) {
    const confirmar = confirm('¿Eliminar este miembro del comité?');
    if (confirmar) this.comite.splice(indice, 1);
  }
  resetFormulario() {
    this.nuevoMiembro = { nombre: '', correo: '', rol: '' };
    this.editandoIndice = null;
  }

  // Busqueda y ordenamiento
  busqueda = '';
  orden = 'asc';

  get comiteFiltrado() {
    return this.comite
      .filter(
        (miembro) =>
          miembro.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          miembro.correo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          miembro.rol.toLowerCase().includes(this.busqueda.toLowerCase())
      )
      .sort((a, b) => {
        return this.orden === 'asc'
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre);
      });
  }

  correoActivo: any = null; // el miembro al que se le mandará el mensaje
  mostrarFormularioCorreo: boolean = false;

  formularioCorreo = {
    asunto: '',
    mensaje: '',
  };

abrirFormularioCorreo(miembro: any) {
  this.correoActivo = miembro;
  this.mostrarFormularioCorreo = true;
  this.formularioCorreo = {
    asunto: '',
    mensaje: ''
  };
}

cerrarFormularioCorreo() {
  this.mostrarFormularioCorreo = false;
}

enviarCorreo() {
  alert("Mensaje enviado");
  this.cerrarFormularioCorreo();
}


}
