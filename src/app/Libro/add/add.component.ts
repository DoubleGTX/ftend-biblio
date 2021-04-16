import { Component, OnInit, ViewChild } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Libro } from 'src/app/Models/Libro';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
 libro:Libro = new Libro();
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
  ngOnInit(): void {
  
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

  Agr(){
   const nombre = this.libro.nombre;
    if(nombre){
    this.service.getLibroNombre(nombre)
    .subscribe(data=>{
      console.log(data);
      if(data== null){
       this.Guardar();
      }else{
        this._snackBar.open('No Puede ser guardado el nombre ya existe','X',{
          duration: 3000
        });
        
      }
    })
  }
}

   Guardar(){
    this.service.createLibro(this.libro)
    .subscribe(data=>{
    alert("Se agrego el nuevo libro "+this.libro.nombre+" !");
    this.router.navigate(["listar"]);
  
    })  
  }
}