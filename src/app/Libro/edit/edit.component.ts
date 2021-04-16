import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Router } from '@angular/router';
import { Libro } from 'src/app/Models/Libro';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  libro:Libro;
  minDate: Date;
  durationInSeconds = 5;
  formu: FormGroup;
  constructor(
   private router:Router, 
   private service:ServiceService,
   private fb: FormBuilder,
   private _snackBar: MatSnackBar) {
  const fecha_publicacion = new Date().getFullYear(); 
  this.formu = this.validarCampos();
  this.minDate = new Date(fecha_publicacion - 10, 0, 1);
     }

  ngOnInit() {
    this.Editar();
  }

  validarCampos(){
    
    return new FormGroup({
       nombre: new FormControl('', [ Validators.required, Validators.maxLength(150)]),
       descripcion:new FormControl('', [ Validators.required, Validators.maxLength(300)]),
       autor: new FormControl('', [ Validators.required, Validators.maxLength(150)]),
       fecha_publicacion:new FormControl('', [ Validators.required,]),
       numero_ejemplares: new FormControl('', [ Validators.required,]),
       costo:new FormControl('', [ Validators.required,]),
     })
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
    console.log(this.formu);
    if(this.formu.invalid){
      return
    }else{
   let nombre= localStorage.getItem("nombre")
    this.service.updateLibro(libro, nombre)
    .subscribe(data=>{
      this.libro=data;
      alert("Se actualizo el libro con exito!");
      this.router.navigate(["listar"]);
    })
    
  }
}
}
