import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {ViewChild, ElementRef } from '@angular/core';

//import { modalEjemplo } from './modalEjemplo/modalEjemplo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';




@Component({
    selector: 'Ejemplos',
    styleUrls: ['./Ejemplos.component.css'],
    standalone: true,
    templateUrl: './Ejemplos.component.html',
    imports: [FormsModule, CommonModule, MatDialogModule] 
})

export class EjemplosComponents implements OnInit, OnDestroy {

     constructor(private _matDialog: MatDialog) {

     }
     
    //INPUT
    valueInput: string="";

    //SELECT 
    valueSelected: string | null =null;

    //INPUT FILES
    ArchivoFile: File | null = null;
    labelArchivo: string ="PDF / 1 MB";
    fileError: string = "";

    //SELECT - BUSQUEDA
    selectedUsuario: any = null;
    allUsers:any[] = [{nombre:"Enrique Alexis Gudiño Portilla"},{nombre:"Cosme Fulanito"}];
    searchTerm:string = "";
    filteredOptions:any[] = [{nombre:"Enrique Alexis Gudiño Portilla"},{nombre:"Cosme Fulanito"}];

    filterOptions() {
        const term = this.searchTerm.toLowerCase().trim();
        this.filteredOptions = this.allUsers.filter(u =>
            u.nombre.toLowerCase().includes(term) 
        );
    }

    //CHECKBOX
    valueCheckBox: boolean = false;

    //RADIOBUTTON
    valueRadio: string = "";

    //INPUT FECHA AÑO-MES
    valueMesAnio: string = ""; // formato: "2026-07"
    fechaMin: string = "2025-01";
    fechaMax: string = this.getMesActual();
    
    private getMesActual(): string {
        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        return `${anio}-${mes}`;
    }

    //INPUT BUSQUEDA
    valueBusqueda: string = "";

    onBuscar(): void {
        console.log('Buscando:', this.valueBusqueda);
    }

    //TABLA
    listaDatos: any[] = [
    { numEmpleado: '10234', nombre: 'Enrique Alexis Gudiño Portilla', departamento: 'Informatica', puesto: 'Desarrollador Frontend', activo: true },
    { numEmpleado: '10235', nombre: 'Cosme Fulanito', departamento: 'Recursos Humanos', puesto: 'Analista de Nómina', activo: false },
    ];

    onEditar(item:any): void {
        console.log('Editar:', item);
    }

    
    ngOnInit(): void {

    }


    ngOnDestroy(): void {

    }


    valorSeleccionadoDeTabla: any;
    openModal(event: Event, item: any) {
        this.valorSeleccionadoDeTabla = item;

        document.querySelectorAll('.row-selected').forEach(elemento => {
            elemento.classList.remove('row-selected');
        });

        const elemento = event.currentTarget as HTMLElement;
        elemento.classList.add('row-selected');

        /*const dialogRef = this._matDialog.open(modalEjemplo, {
            data: {
                dato1: this.valorSeleccionadoDeTabla.nombre,
                dato2: this.valorSeleccionadoDeTabla.departamento,
            }
        });

        dialogRef.afterClosed().subscribe((result:any) => {
            
        });*/
    }

    //INPUT ARCHIVO (validaciones)
    onFileChange(event: Event,typeFile:any,sizeFile:any,targetInput:any): void {
        const input = event.target as HTMLInputElement;
        let type: string = 'success';
        let file: File | null = null;

        let fileError = '';
        this[targetInput] = null;

        if (!input.files || input.files.length == 0){
     
            fileError ="No se cargo correctamente el archivo";
        }else{

            file = input.files[0];
        
            if (!typeFile.includes(file.type)) {
                type="warning";
                fileError = 'Tipo de archivo no permitido';
            }else{

                const sizeMB = file.size / (1024 * 1024);
                if (sizeMB > sizeFile) {
                    type="warning";
                    fileError = `El archivo no debe superar ${sizeFile} MB. (Actual: ${sizeMB.toFixed(2)} MB)`;
                }
            }
        } 
        input.value = '';
        if(type=="success"){
            this[targetInput] = file;
        }else{
            alert(type+": " + fileError);
            //this.swal('¡Atención!',fileError,type);
        }
    }
    //END INPUT ARCHIVO




    GenerarPDF(){
        const ventanaImpresion = window.open('', '_blank')!;
const tuHtmlAqui="";
const fondo = new URL('assets/fondo.png', location.href).href;
ventanaImpresion.document.head.innerHTML = `
  <style>
    @page { size: letter; margin: 0; }
    html, body { margin: 0; padding: 0; }
    .hoja {
      position: relative;
      width: 8.5in;
      height: 11in;
      page-break-after: always;
    }
    .hoja img.fondo {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
    }
    .contenido { position: relative; padding: 1in 0.8in; }
  </style>
`;

ventanaImpresion.document.body.innerHTML = `
  <div class="hoja">
    <img class="fondo" src="${fondo}" />
    <div class="contenido">
      ${tuHtmlAqui}
    </div>
  </div>
`;



setTimeout(() => {
            ventanaImpresion!.document.close();
            ventanaImpresion!.focus();
            ventanaImpresion!.print();
            ventanaImpresion!.close();
        }, 1000);

    }


}