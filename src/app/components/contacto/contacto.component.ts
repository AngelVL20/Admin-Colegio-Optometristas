import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent {
  mensajes: any[] = [
    {
      nombre: 'Ana Torres',
      correo: 'ana.torres@example.com',
      mensaje: 'Hola, me gustaría saber más sobre sus servicios.',
    },
    {
      nombre: 'Luis Pérez',
      correo: 'luis.perez@example.com',
      mensaje: '¿Tienen horarios disponibles los sábados?',
    },
    {
      nombre: 'María Gómez',
      correo: 'maria.gomez@example.com',
      mensaje: 'Estoy interesada en agendar una cita, ¿cómo procedo?',
    },
  ];

  mensajeActivo: any = null; // El mensaje que se está viendo o respondiendo
  mostrarModal: boolean = false;
  modo: 'ver' | 'responder' = 'ver';

  formularioCorreo = {
    asunto: '',
    mensaje: '',
  };

  verMensaje(mensaje: any) {
    this.modo = 'ver';
    this.mensajeActivo = mensaje;
    this.mostrarModal = true;
  }

  responderMensaje(mensaje: any) {
    this.modo = 'responder';
    this.mensajeActivo = mensaje;
    this.formularioCorreo = {
      asunto: '',
      mensaje: '',
    };
    this.mostrarModal = true;
  }

  eliminarMensaje(indice: number) {
    const confirmar = confirm('¿Eliminar este mensaje recibido?');
    if (confirmar) this.mensajes.splice(indice, 1);
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.mensajeActivo = null;
  }

  enviarRespuesta() {
    alert(`Mensaje enviado a ${this.mensajeActivo.correo}`);
    this.cerrarModal();
  }
}
