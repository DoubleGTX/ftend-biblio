import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Libro }      from '../Models/Libro';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  constructor(private http:HttpClient) { }

  Url='http://localhost:8082/libros';

  getLibros(){
    return this.http.get<Libro[]>(this.Url);
  }
  
  createLibro(libro:Libro){
    return this.http.post<Libro>(this.Url,libro);
  }
  getLibroNombre(nombre:string){
    return this.http.get<Libro>(this.Url+"/"+nombre);
  }
  updateLibro(libro:Libro, nombre: string){
    return this.http.put<Libro>(this.Url+"/"+nombre,libro);
  }
  deleteLibro(libro:Libro){
    return this.http.delete<Libro>(this.Url+"/"+libro.nombre);
  }
}
