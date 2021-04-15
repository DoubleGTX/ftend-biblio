import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Libro } from 'src/app/Models/Libro';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  libro: Libro=new Libro();
  constructor(private router:Router, private service:ServiceService) { }

  ngOnInit() {
    this.Editar();
  }

  
  Editar(){
    let nombre=localStorage.getItem("nombre");
    if(nombre){
    this.service.getLibroNombre(nombre)
    .subscribe(data=>{
      this.libro=data;
    })
  }

  }
  Actualizar(libro:Libro){
   let nombre= localStorage.getItem("nombre")
    this.service.updateLibro(libro, nombre)
    .subscribe(data=>{
      this.libro=data;
      alert("Se actualizo el libro con exito!");
      this.router.navigate(["listar"]);
    })
    
  }
}
