import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Libro } from 'src/app/Models/Libro';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
 libro:Libro = new Libro();
 

 formu: FormGroup;
 constructor(private router:Router, private service:ServiceService,private fb: FormBuilder) {
 this.formu = this.validarCampos();
 
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
    });
  }
   Guardar(){
    this.service.createLibro(this.libro)
    .subscribe(data=>{
    alert("Se agrego el nuevo libro "+this.libro.nombre+" !");
    this.router.navigate(["listar"]);
  
    })  
  }
}