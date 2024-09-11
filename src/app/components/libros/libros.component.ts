import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LibroAutorService } from '../../services/libro-autor.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
})
export class LibrosComponent {

  libro = {
    titulo: '',
    anio: null,
    genero: '',
    numeroPaginas: null,
    autorRut: ''
  };

  mensaje: string = '';

  constructor(private libroAutorService: LibroAutorService) {}

  registrarLibro(form: NgForm) {
    if (form.valid) {
      this.libroAutorService.registrarLibro(this.libro).subscribe({
        next: (response) => {
          this.mensaje = 'Libro registrado exitosamente';
          form.resetForm();
        },
        error: (error) => {
          if (error.status === 400) {
            if (typeof error.error === 'string') {
              this.mensaje = 'Error al registrar el libro: ' + error.error;
            } else if (error.error && error.error.mensaje) {
              this.mensaje = 'Error al registrar el libro: ' + error.error.mensaje;
            } else {
              this.mensaje = 'Error al registrar el libro: ' + error.message;
            }
          } else {
            this.mensaje = 'Error desconocido: ' + error.message;
          }
        },
        complete: () => {
          console.log('Registro de libro completado');
        }
      });
    }
  }
}
