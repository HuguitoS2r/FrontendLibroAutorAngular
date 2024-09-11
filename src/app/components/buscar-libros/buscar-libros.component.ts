import { Component, OnInit } from '@angular/core';
import { LibroAutorService } from '../../services/libro-autor.service';

@Component({
  selector: 'app-buscar-libros',
  templateUrl: './buscar-libros.component.html',
})
export class BuscarLibrosComponent implements OnInit {
  filtro: string = '';
  rutAutor: string = '';
  titulo: string = '';
  anio: number | null = null;
  nombreAutor: string = '';
  pagina: number = 1;
  tamanoPagina: number = 5;
  totalResultados: number = 0;
  libros: any[] = [];

  Math = Math;

  constructor(private libroAutorService: LibroAutorService) {}

  ngOnInit(): void {
    this.buscarLibros();
  }

  buscarLibros(): void {
    this.libroAutorService.buscarLibros(this.filtro, this.rutAutor, this.titulo, this.anio, this.nombreAutor, this.pagina, this.tamanoPagina)
      .subscribe({
        next: (response) => {
          const librosConReferencias = response.resultados.$values;

          const mapaAutores: { [key: string]: any } = {};

          librosConReferencias.forEach((libro: { autor: { $ref: any; $id: string | number; }; }) => {
            if (libro.autor && !libro.autor.$ref) {
              mapaAutores[libro.autor.$id] = libro.autor;
            }
          });

          this.libros = librosConReferencias.map((libro: { autor: { $ref: string | number; }; }) => {
            if (libro.autor && libro.autor.$ref) {
              libro.autor = mapaAutores[libro.autor.$ref];
            }
            return libro;
          });

          this.totalResultados = response.totalResultados;
        },
        error: (error) => {
          console.error('Error al obtener los libros:', error);
        }
      });
  }

  cambiarPagina(nuevaPagina: number): void {
    this.pagina = nuevaPagina;
    this.buscarLibros();
  }

  limpiarFiltros(): void {
    this.filtro = '';
    this.rutAutor = '';
    this.titulo = '';
    this.anio = null;
    this.nombreAutor = '';

    this.pagina = 1;

    this.buscarLibros();
  }
}
