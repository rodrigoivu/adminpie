import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva.model';
import { User } from '../../models/user.model';
import { ReservaService, ProfesionalService } from '../../services/service.index';

declare var swal:any;

interface itemReserva {
  datosReserva: Reserva,
  especialidad: string,
  repite:string,
  indicaHora: string
}

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styles: []
})
export class ReservasComponent implements OnInit {
  reservas: Reserva[]=[];
  itemsReserva: itemReserva[]=[];
  especialidades: string[]=[];

  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  terminoBuscar:string ='';

  constructor(
  		public _reservaService: ReservaService,
  		public _profesionalService: ProfesionalService
  	) {
    
  }

  ngOnInit() {
  	this.cargarReservas();
  }

  cargarReservas(){
    this.cargando =true;
    this._reservaService.cargarReservas(this.desde)
        .subscribe( (resp: any) =>{
               
          this.totalRegistros = resp.total;
          this.reservas = resp.reservas;
          
          this.adjuntaDatosReserva();
          this.cargando = false;

     });

  }



  adjuntaDatosReserva(){

  	this.itemsReserva=[];

  	for(let reserva of this.reservas){
      

  		this.adjuntarProfesion(reserva);
   	}
   	
  }



  cambiarDesde( valor: number ){

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ){
      return;
    }

    if ( desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarReservas();

  }

  editarReserva(reserva:Reserva){

  }
  eliminaReserva(reserva:any){
   var res: Reserva = reserva;;

    swal({
      title: '¿ Está seguro ?',
      text: 'Está a punto de borrar la reserva de ' + reserva.paciente.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {

      if (borrar) {
        this._reservaService.borrarReserva( res._id )
            .subscribe( (borrado: any) => {
              console.log( borrado );
              this.cargarReservas(); 
            });
      } 
    });
  }

  buscarReserva( termino: string){
    // this.terminoBuscar=termino;
    // if ( termino.length <= 0){
    //   this.cargarPacientes();
    //   return;
    // }
    // this.cargando = true;
    // this._pacienteService.buscarPacientes ( termino )
    //     .subscribe( ( pacientes: Paciente[]) => {
    //       this.pacientes  = pacientes;
    //       this.cargando = false;
    //     });
  }



  adjuntarProfesion(reserva:any){

  	let itemReserva: itemReserva;
   	let usr: User = reserva.user;

    let repite = reserva.repiteDia == 10? 'NO': this.indicaNombreDiaAno(reserva.repiteDia,reserva.repiteAno);
    let indicaHora = this.indicaHora(reserva.horaReservado,reserva.poshora);
     
  	//BUSCA PROFESON DE PROFESIONAL
    this._profesionalService.buscarProfesion(usr._id)
          .subscribe((resp:any) =>{

            if (resp){
            	itemReserva={
            		datosReserva: reserva,
      					especialidad: resp,
                repite: repite,
                indicaHora: indicaHora
            	}
          		
            }else{
            	itemReserva={
            		datosReserva: reserva,
  					    especialidad: '',
                repite: repite,
                indicaHora: indicaHora
            	}
            }
            this.itemsReserva.push(itemReserva);

          });

  }

  indicaNombreDiaAno(numerDia:number,ano:number): string{
    let nombreDia:string='';
    let mensaje: string='';
    switch (numerDia){
            case 0:{   //domingo
              nombreDia = 'Domingo';
              break;
            }
            case 1:{   //lunes
              nombreDia = 'Lunes';
              break;
            }
            case 2:{   //martes
              nombreDia = 'Martes';
              break;
            }
            case 3:{   //miercoles
              nombreDia = 'Miércoles';
              break;
            }
            case 4:{   //jueves
              nombreDia = 'Jueves';
              break;
            }
            case 5:{   //viernes
              nombreDia = 'Viernes';
              break;
            }
            case 6:{   //sábado
              nombreDia = 'Sábado';
              break;
            }
            default:{   
              
              break;
            }
          }
    mensaje= 'Cada '+ nombreDia + ' del ' + ano;      
    return mensaje;     
  }

  indicaHora(hora: number, pos: any[]): string{
    let flgIni: boolean = true;
    let posIni: number=0;
    let posTot: number=0;
    let Hora=hora+7;
    let tramoHora: string='';

    for  ( var i=0; i<=5 ; i++ ){
      if(pos[i].pos==1){
        if(flgIni){
          posIni=i;
          flgIni=false;
        }
        posTot++;
      }
    }

    if( posIni == 0 ){

      if(posTot == 6){
        let newHora = Hora+1
        tramoHora= Hora+':00' + ' - ' + newHora+':00';
      }else{
        tramoHora= Hora+':00' + ' - ' + Hora+':'+posTot*10;
      }
      
    }else{
      let posFin: number = posIni+posTot;

      if(posFin == 6){
          let newHora = Hora+1
          tramoHora = Hora+':'+posIni*10 + ' - ' + newHora+':00';
      }else{
          tramoHora = Hora+':'+posIni*10 + ' - ' + Hora+':'+posFin*10;
      }
      
    }
    
    return tramoHora;

  }

}