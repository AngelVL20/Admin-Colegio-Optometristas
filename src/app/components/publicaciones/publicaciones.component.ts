import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
})
export class PublicacionesComponent {
  obtenerIndiceReal(pub: any): number {
    return this.publicaciones.indexOf(pub);
  }

  mostrarFormulario = false;
  editandoIndice: number | null = null;

  publicaciones: any[] = [];

  // Búsqueda y ordenamiento
  busqueda = '';
  criterioOrden = 'fechaCreacion';
  mensajeConfirmacion: string | null = null;
  

  // Artículo actual en edición
  nuevaPublicacion = {
    titulo: '',
    autor: '',
    categoria: '',
    tags: '',
    plantilla: '',
    creacion: new Date(),
    modificacion: new Date(),
    contenido: {
      encabezado: '',
      texto: '',
      imagenUrl: '',
    },
  };

  // Editor de contenido
  mostrarEditorContenido = false;
  editandoContenido = false;

  contenidoArticulo = {
    encabezado: '',
    texto: '',
    imagenUrl: '',
  };

  // Alternar el formulario
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;

    if (this.mostrarFormulario && this.editandoIndice === null) {
      this.nuevaPublicacion = {
        titulo: '',
        autor: '',
        categoria: '',
        tags: '',
        plantilla: '',
        creacion: new Date(),
        modificacion: new Date(),
        contenido: {
          encabezado: '',
          texto: '',
          imagenUrl: '',
        },
      };
    }

    if (!this.mostrarFormulario) {
      this.editandoIndice = null;
    }
  }

  // Guardar o editar publicación
agregarOEditarPublicacion() {
  let contenidoFinal;

  if (this.editandoIndice === null) {
    // NUEVA PUBLICACIÓN
    contenidoFinal = {
      ...this.nuevaPublicacion.contenido
    };
  } else {
    // ACTUALIZANDO PUBLICACIÓN EXISTENTE
    contenidoFinal = this.editandoContenido
      ? { ...this.contenidoArticulo }
      : { ...this.publicaciones[this.editandoIndice].contenido };
  }

  const datos = {
    ...this.nuevaPublicacion,
    tags: this.nuevaPublicacion.tags.split(',').map((tag) => tag.trim()),
    modificacion: new Date(),
    contenido: contenidoFinal
  };

  if (this.editandoIndice === null) {
    datos.creacion = new Date();
    this.publicaciones.push(datos);
    this.mensajeConfirmacion = '¡Publicación creada correctamente!';
  } else {
    datos.creacion = this.publicaciones[this.editandoIndice].creacion;
    this.publicaciones[this.editandoIndice] = datos;
    this.mensajeConfirmacion = '¡Publicación actualizada correctamente!';
  }

  // Ocultar mensaje después de 3 segundos
  setTimeout(() => this.mensajeConfirmacion = null, 3000);

  // Reiniciar estados y cerrar formularios
  this.mostrarFormulario = false;
  this.mostrarEditorContenido = false;
  this.editandoIndice = null;
  this.editandoContenido = false;

  // Limpiar formularios
  this.nuevaPublicacion = {
    titulo: '',
    autor: '',
    categoria: '',
    tags: '',
    plantilla: '',
    creacion: new Date(),
    modificacion: new Date(),
    contenido: {
      encabezado: '',
      texto: '',
      imagenUrl: '',
    },
  };

  this.contenidoArticulo = {
    encabezado: '',
    texto: '',
    imagenUrl: '',
  };
}


  // Editar una publicación existente
  editarPublicacion(pub: any) {
    const indiceReal = this.obtenerIndiceReal(pub);
    this.nuevaPublicacion = {
      ...pub,
      tags: pub.tags.join(', '),
      contenido: { ...pub.contenido },
    };
    this.editandoIndice = indiceReal;
    this.mostrarFormulario = true;
  }

  // Abrir ventana flotante para editar contenido
  editarContenido(indice: number) {
    const publicacion = this.publicaciones[indice];
    this.contenidoArticulo = {
      encabezado: publicacion.contenido?.encabezado || '',
      texto: publicacion.contenido?.texto || '',
      imagenUrl: publicacion.contenido?.imagenUrl || '',
    };
    this.mostrarEditorContenido = true;
  }
  editarContenidoArticulo() {
    if (this.editandoIndice !== null) {
      const pub = this.publicaciones[this.editandoIndice];
      this.contenidoArticulo = {
        encabezado: pub.contenido.encabezado || '',
        texto: pub.contenido.texto || '',
        imagenUrl: pub.contenido.imagenUrl || '',
      };
      this.mostrarEditorContenido = true;
    }
  }

  vistaArticulo: any = null;
  mostrarVista: boolean = false;

  // Guardar contenido desde el editor
  guardarContenido() {
    if (this.editandoIndice !== null) {
      // Asignar contenido editado directamente a la publicación
      this.publicaciones[this.editandoIndice].contenido = {
        ...this.contenidoArticulo,
      };

      // Cerrar editor y salir de modo edición
      this.mostrarEditorContenido = false;
      this.editandoContenido = false;
    }
  }

  abrirEditorContenido() {
    this.editandoContenido = true;
    this.mostrarEditorContenido = true;

    if (this.editandoIndice !== null) {
      this.contenidoArticulo = {
        ...this.publicaciones[this.editandoIndice].contenido,
      };
    } else {
      this.contenidoArticulo = {
        encabezado: '',
        texto: '',
        imagenUrl: '',
      };
    }
  }

  cerrarEditorContenido() {
    this.mostrarEditorContenido = false;
  }

  cargarImagen(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        this.contenidoArticulo.imagenUrl = lector.result as string;
      };
      lector.readAsDataURL(archivo);
    }
  }

  eliminarPublicacion(pub: any) {
    const confirmar = confirm('¿Deseas eliminar esta publicación?');
    if (confirmar) {
      const indice = this.obtenerIndiceReal(pub);
      this.publicaciones.splice(indice, 1);
    }
  }

  // Vista previa de contenido
  vistaPreviaContenido: any = null;

  verVistaPrevia(pub: any) {
    this.vistaPreviaContenido = {
      titulo: pub.titulo,
      encabezado: pub.contenido?.encabezado,
      texto: pub.contenido?.texto,
      imagenUrl: pub.contenido?.imagenUrl,
    };
  }

  cerrarVistaPrevia() {
    this.vistaPreviaContenido = null;
  }

  // Filtrado y ordenamiento
  get publicacionesFiltradas() {
    return this.publicaciones
      .filter(
        (pub) =>
          pub.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          pub.autor.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          pub.tags.some((tag: string) =>
            tag.toLowerCase().includes(this.busqueda.toLowerCase())
          )
      )
      .sort((a, b) => {
        switch (this.criterioOrden) {
          case 'titulo':
            return a.titulo.localeCompare(b.titulo);
          case 'autor':
            return a.autor.localeCompare(b.autor);
          case 'fechaModificacion':
            return (
              new Date(b.modificacion).getTime() -
              new Date(a.modificacion).getTime()
            );
          case 'fechaCreacion':
          default:
            return (
              new Date(b.creacion).getTime() - new Date(a.creacion).getTime()
            );
        }
      });
  }

  ordenarPublicaciones() {
    // solo forzar el recalculo del get
  }
}
