import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroAutorService {

  private apiUrl = 'http://localhost:5062/api';

  constructor(private http: HttpClient) { }

  // Buscar libros y autores por palabras clave según indicaciones
  buscarLibros(filtro: string = '', rutAutor: string = '', titulo: string = '', anio: number | null = null, nombreAutor: string = '', pagina: number = 1, tamanoPagina: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('palabraClave', filtro)
      .set('rutAutor', rutAutor)
      .set('titulo', titulo)
      .set('pagina', pagina.toString())
      .set('tamanoPagina', tamanoPagina.toString());

    if (anio) {
      params = params.set('anio', anio.toString());
    }

    if (nombreAutor) {
      params = params.set('nombreAutor', nombreAutor);
    }

    return this.http.get(`${this.apiUrl}/Libro`, { params });
  }


  // Registrar un nuevo autor
  registrarAutor(autor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Autor`, autor);
  }

  // Registrar un nuevo libro
  registrarLibro(libro: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Libro`, libro);
  }
}
