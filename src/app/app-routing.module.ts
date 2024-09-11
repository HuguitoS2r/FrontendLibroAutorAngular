import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosComponent } from './components/libros/libros.component';
import { AutoresComponent } from './components/autores/autores.component';
import { BuscarLibrosComponent } from './components/buscar-libros/buscar-libros.component';

const routes: Routes = [
  { path: 'libros', component: LibrosComponent },
  { path: 'autores', component: AutoresComponent },
  { path: 'buscar', component: BuscarLibrosComponent },
  { path: '', redirectTo: '/buscar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
