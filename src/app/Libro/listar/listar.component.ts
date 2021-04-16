import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Libro } from 'src/app/Models/libro';
import { ServiceService } from 'src/app/Service/service.service';

export interface Libros {
    nombre: string;
    descripcion: string;
    autor: string;
    fecha_publicacion: Date;
    numero_ejemplares?: number;
    costo?: number
  }

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
}) 
export class ListarComponent implements OnInit, AfterViewInit  {

  

  libros:Libro[];
  dataSource: Libros[];
  displayedColumns: string[];
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service:ServiceService, private router:Router) {  
     this.displayedColumns = ['nombre', 'descripcion', 'autor', 'fecha_publicacion', 'numero_ejemplares', 'costo'];
     this.service.getLibros()
    .subscribe(data=>{
      console.log(data);
      this.libros=data;
      this.dataSource = this.libros;

     //this.dataSource = data;
     //this.dataSource.paginator = this.paginator;
     //this.dataSource.sort = this.sort;
    });
     
  }

  ngOnInit() {
  // this.data()
  }

  data(){ }
  ngAfterViewInit() {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();

    //if (this.dataSource.paginator) {
      //this.dataSource.paginator.firstPage();
    //}
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