import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LibroAutorService } from '../../services/libro-autor.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
})
export class AutoresComponent {

  autor = {
    rut: '',
    nombreCompleto: '',
    fechaNacimiento: '',
    ciudadProcedencia: '',
    correoElectronico: ''
  };

  mensaje: string = '';

  constructor(private libroAutorService: LibroAutorService) {}

  // Método para registrar el autor
  registrarAutor(form: NgForm) {
    if (form.valid) {
      this.libroAutorService.registrarAutor(this.autor).subscribe({
        next: (response) => {
          this.mensaje =  response.mensaje;
          form.resetForm();
        },
        error: (error) => {
          this.mensaje = 'Error al registrar el autor: ' + error.message;
        },
        complete: () => {
          console.log('Registro completado');
        }
      });
    }
  }
}
