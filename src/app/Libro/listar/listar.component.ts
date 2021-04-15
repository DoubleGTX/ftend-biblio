import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/Models/Libro';
import { ServiceService } from 'src/app/Service/service.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  libros:Libro[];
  constructor(private service:ServiceService, private router:Router) { }

  ngOnInit() {
    this.service.getLibros()
    .subscribe(data=>{
     this.libros=data;
    });
  }
  Editar(libro:Libro){
     if(libro.nombre!=undefined){
    localStorage.setItem("nombre",libro.nombre);
    this.router.navigate(["edit"]);}
  }

  Delete(libro:Libro){
    this.service.deleteLibro(libro)
    .subscribe(data=>{
      this.libros=this.libros.filter(l=>l!==libro);
      alert("Libro eliminado");
    })
  }
}
