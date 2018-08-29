import { Component, AfterViewInit } from '@angular/core';
import { ProfesionalService, PacienteService, AnamnesisService, FonoaudiologiaService, GeneralService, KinesiologiaService, PsicologiaService, TerapeutaService} from '../services/service.index';



 const diaHoy = new Date();
@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {
  anoConsulta:number=0;
  diaHoySinMs: Date;
  seisDiasAntes: Date = new Date;
  diaHoySinMsString: string;
  seisDiasAntesString: string;
  numeroDiaHoy: number;

  cargando: boolean = true;
  carga1: boolean = true;
  carga2: boolean = true;
  carga3: boolean = true;
  carga4: boolean = true;
  carga5: boolean = true;

  fonoaudiologiaDataTotal: any[]=[];
  generalDataTotal: any[]=[];
  kinesiologiaDataTotal: any[]=[];
  psicologiaDataTotal: any[]=[];
  terapeutaDataTotal: any[]=[];

  fonoaudiologiaDataAno: any[]=[];
  generalDataAno: any[]=[];
  kinesiologiaDataAno: any[]=[];
  psicologiaDataAno: any[]=[];
  terapeutaDataAno: any[]=[];

  totalFonoaudiologiaDataAno: number=0;
  totalGeneralDataAno: number=0;
  totalKinesiologiaDataAno: number=0;
  totalPsicologiaDataAno: number=0;
  totalTerapeutaDataAno: number=0;
  totalEspecialidadesDataAno: number=0;

  totalPorDiaSemana: number[]=[];
  nombreDiaSemana: string[]=[];

  totalLunes: number = 0;
  totalMartes: number = 0;
  totalMiercoles: number = 0;
  totalJueves: number = 0;
  totalViernes: number = 0;
  totalSabado: number = 0;
  totalDomingo: number = 0;
  
  constructor(

      public _profesionalService: ProfesionalService,
      public _pacienteService: PacienteService,
      public _anamnesisService: AnamnesisService,
      public _fonoaudiologiaService: FonoaudiologiaService,
      public _generalService: GeneralService,
      public _kinesiologiaService: KinesiologiaService,
      public _psicologiaService: PsicologiaService,
      public _terapeutaService: TerapeutaService,

    ) {

    this.iniciaFechasReferencia();    
    this.inicializaDatos();
  }

  ngAfterViewInit() {
      this.iniciaFechasReferencia(); 
  }

  iniciaFechasReferencia(){
    let diatemp:Date = new Date;

    this.anoConsulta = diaHoy.getFullYear();
    this.diaHoySinMs = new Date(diaHoy.getFullYear(),diaHoy.getMonth(), diaHoy.getDate() ); // sin los milisegundos
    this.diaHoySinMsString = diaHoy.getDate()+'/'+diaHoy.getMonth()+'/'+diaHoy.getFullYear();
    diatemp.setDate(this.diaHoySinMs.getDate()-6);
    this.seisDiasAntes = new Date(diatemp.getFullYear(),diatemp.getMonth(), diatemp.getDate() ); // sin los milisegundos
    this.seisDiasAntesString = this.seisDiasAntes.getDate()+'/'+this.seisDiasAntes.getMonth()+'/'+this.seisDiasAntes.getFullYear();
    this.numeroDiaHoy = diaHoy.getDay();
    this.asignaNombreDiaSemana();
  }

  inicializaDatos(){

    this.cargando=true;

    this.totalLunes = 0;
    this.totalMartes = 0;
    this.totalMiercoles = 0;
    this.totalJueves = 0;
    this.totalViernes = 0;
    this.totalSabado = 0;
    this.totalDomingo = 0;

    this.getFonoaudiologiaData();
    this.getGeneralData();
    this.getKinesiologiaData();
    this.getPsicologiaData();
    this.getTerapeutaData();
  }

  asignaNombreDiaSemana(){
    let diaTemp: Date= new Date;
    let nameDay: string;
    this.lineChartLabels = [];

    for (var i = 0; i < 6; i++) {
      diaTemp.setDate(this.seisDiasAntes.getDate()+i);
      let nroDia: number =diaTemp.getDay();

      switch(nroDia) { 
         case 0: { 
            nameDay ='Domingo'; 
            break; 
         } 
         case 1: { 
            nameDay = 'Lunes';
            break; 
         } 
         case 2: { 
            nameDay = 'Martes';
            break; 
         } 
         case 3: { 
            nameDay = 'Miercoles';
            break; 
         } 
         case 4: { 
            nameDay = 'Jueves';
            break; 
         } 
         case 5: { 
            nameDay = 'Viernes';
            break; 
         } 
         case 6: { 
            nameDay = 'Sabado';
            break; 
         } 
      } 
      this.lineChartLabels.push(nameDay);
    }
    nameDay ='Hoy';
    this.lineChartLabels.push(nameDay);
  }

  //DATOS ADMINPIE

  // Pie
  public pieChartLabelsEspecialidades: string[] = ['Fonoaudiología', 'General', 'Kinesiología', 'Psicología', 'T.Ocupacional'];
  public pieChartDataEspecialidades: number[] = [0, 0, 0, 0, 0];
  public pieChartTypeEspecialidades = 'pie';
  public pieChartColorsEspecialidades= [{backgroundColor: ['#009efb', '#55ce63', '#90a4ae', '#7460ee', '#f62d51']}];

  // lineChart
  // tslint:disable-next-line:max-line-length
  public lineChartData: Array<any> = [{ data: [65, 39, 80, 15, 76, 35, 40], label: 'Series A' }];
  public lineChartLabels: Array<any> = ['', '', '', '', '', '', ''];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(0,158,251,0.1)',
      borderColor: '#009efb',
      pointBackgroundColor: '#009efb',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#009efb'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
   // This is line chart
  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 10
  };

  public barChartLabels: string[] = ['2011', '2012', '2013', '2014', '2015', '2016', '2017'];
  public barChartType = 'bar';
  public barChartLegend = true;

  // tslint:disable-next-line:max-line-length
  public barChartData: any[] = [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Iphone 8' }, { data: [28, 48, 40, 19, 86, 27, 90], label: 'Iphone X' }];
  public barChartColors: Array<any> = [{ backgroundColor: '#55ce63' }, { backgroundColor: '#009efb' }];
  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';

  // Radar
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  // tslint:disable-next-line:max-line-length
  public radarChartData: any = [{ data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' }, { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }];
  public radarChartType = 'radar';
  public radarChartColors: Array<any> = [
    { backgroundColor: 'rgba(0,158,251,0.5)', borderColor: 'rgba(0,158,251,1)' },
    { backgroundColor: 'rgba(85,206,99,0.5)', borderColor: 'rgba(85,206,99,1)' }
  ];
  // Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';

  // PolarArea
  public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType = 'polarArea';

  // // lineChart
  // // tslint:disable-next-line:max-line-length
  // public lineChartData: Array<any> = [{ data: [65, 39, 80, 15, 76, 35, 40], label: 'Series A' }, { data: [18, 58, 20, 69, 16, 27, 90], label: 'Series B' }];
  // public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartOptions: any = {
  //   responsive: true
  // };
  // public lineChartColors: Array<any> = [
  //   {
  //     // grey
  //     backgroundColor: 'rgba(0,158,251,0.1)',
  //     borderColor: '#009efb',
  //     pointBackgroundColor: '#009efb',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: '#009efb'
  //   },
  //   {
  //     // dark grey
  //     backgroundColor: 'rgba(85,206,99,0.1)',
  //     borderColor: '#55ce63',
  //     pointBackgroundColor: '#55ce63',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: '#55ce63'
  //   }
  // ];
  // public lineChartLegend = true;
  // public lineChartType = 'line';


  getFonoaudiologiaData(){
    this.fonoaudiologiaDataTotal=[];
    this._fonoaudiologiaService.listaFichas()
        .subscribe( (resp:any) =>{
            this.fonoaudiologiaDataTotal= resp.fechas;
            this.consultaFonoaudiologiaAno(this.anoConsulta);
            this.carga1=false;
            this.cargando = this.carga1 || this.carga2 || this.carga2 || this.carga2 || this.carga2;
        });
  }
  getGeneralData(){
    this.generalDataTotal=[];
    this._generalService.listaFichas()
        .subscribe( (resp:any) =>{
            this.generalDataTotal= resp.fechas;
            this.consultaGeneralAno(this.anoConsulta);
            this.carga2=false;
            this.cargando = this.carga1 || this.carga2 || this.carga2 || this.carga2 || this.carga2;
        });
  }
  getKinesiologiaData(){
    this.kinesiologiaDataTotal=[];
    this._kinesiologiaService.listaFichas()
        .subscribe( (resp:any) =>{
            this.kinesiologiaDataTotal= resp.fechas;
            this.consultaKinesiologiaAno(this.anoConsulta);
            this.carga3=false;
            this.cargando = this.carga1 || this.carga2 || this.carga2 || this.carga2 || this.carga2;
        });
  }
  getPsicologiaData(){
    this.psicologiaDataTotal=[];
    this._psicologiaService.listaFichas()
        .subscribe( (resp:any) =>{
            this.psicologiaDataTotal= resp.fechas;
            this.consultaPsicologiaAno(this.anoConsulta);
            this.carga4=false;
            this.cargando = this.carga1 || this.carga2 || this.carga2 || this.carga2 || this.carga2;
        });
  }
  getTerapeutaData(){
    this.terapeutaDataTotal=[];
    this._terapeutaService.listaFichas()
        .subscribe( (resp:any) =>{
            this.terapeutaDataTotal= resp.fechas;
            this.consultaTerapeutaAno(this.anoConsulta);
            this.carga5=false;
            this.cargando = this.carga1 || this.carga2 || this.carga2 || this.carga2 || this.carga2;
        });
  }

  consultaFonoaudiologiaAno(ano: number){
    this.fonoaudiologiaDataAno=[];
    let diaSplit: string[]; 
    let anofecha: number;
    let mesfecha: number;
    let diafecha: number;

    for(let ficha of this.fonoaudiologiaDataTotal){
        diaSplit = ficha.fecha.split('-');
        anofecha = parseInt(diaSplit[2]);
        mesfecha = parseInt(diaSplit[1])-1;
        diafecha = parseInt(diaSplit[0]);
        let diaFicha: Date= new Date(anofecha,mesfecha,diafecha);
        
        if (anofecha == this.anoConsulta){
            this.fonoaudiologiaDataAno.push(ficha.fecha);
            if(diaFicha.getTime() >= this.seisDiasAntes.getTime()){
              this.sumaTotalSemana(diaFicha.getDay());
            }

        }
    }
    this.totalFonoaudiologiaDataAno=this.fonoaudiologiaDataAno.length;
    this.setDataEspecialidades();
    this. setDataSemana();
  }

 

  consultaGeneralAno(ano: number){
    this.generalDataAno = [];
    let diaSplit: string[]; 
    let anofecha: number;
    let mesfecha: number;
    let diafecha: number;

    for(let ficha of this.generalDataTotal){
        diaSplit = ficha.fecha.split('-');
        anofecha = parseInt(diaSplit[2]);
        mesfecha = parseInt(diaSplit[1])-1;
        diafecha = parseInt(diaSplit[0]);
        let diaFicha: Date= new Date(anofecha,mesfecha,diafecha);

        if (anofecha == this.anoConsulta){
            this.generalDataAno.push(ficha.fecha);
            if(diaFicha.getTime() >= this.seisDiasAntes.getTime()){
              this.sumaTotalSemana(diaFicha.getDay());
            }
        }
    }
    this.totalGeneralDataAno=this.generalDataAno.length;
    this.setDataEspecialidades();
    this. setDataSemana();
  }

  consultaKinesiologiaAno(ano: number){
    this.kinesiologiaDataAno = [];
    let diaSplit: string[]; 
    let anofecha: number;
    let mesfecha: number;
    let diafecha: number;

    for(let ficha of this.kinesiologiaDataTotal){
        diaSplit = ficha.fecha.split('-');
        anofecha = parseInt(diaSplit[2]);
        mesfecha = parseInt(diaSplit[1])-1;
        diafecha = parseInt(diaSplit[0]);
        let diaFicha: Date= new Date(anofecha,mesfecha,diafecha);

        if (anofecha == this.anoConsulta){
            this.kinesiologiaDataAno.push(ficha.fecha);
            if(diaFicha.getTime() >= this.seisDiasAntes.getTime()){
              this.sumaTotalSemana(diaFicha.getDay());
            }
        }
    }
    this.totalKinesiologiaDataAno=this.kinesiologiaDataAno.length;
    this.setDataEspecialidades();
    this. setDataSemana();
  }

  consultaPsicologiaAno(ano: number){
    this.psicologiaDataAno = [];
    let diaSplit: string[]; 
    let anofecha: number;
    let mesfecha: number;
    let diafecha: number;

    for(let ficha of this.psicologiaDataTotal){
        diaSplit = ficha.fecha.split('-');
        anofecha = parseInt(diaSplit[2]);
        mesfecha = parseInt(diaSplit[1])-1;
        diafecha = parseInt(diaSplit[0]);
        let diaFicha: Date= new Date(anofecha,mesfecha,diafecha);

        if (anofecha == this.anoConsulta){
            this.psicologiaDataAno.push(ficha.fecha);
            if(diaFicha.getTime() >= this.seisDiasAntes.getTime()){
              this.sumaTotalSemana(diaFicha.getDay());
            }
        }
    }
    this.totalPsicologiaDataAno=this.psicologiaDataAno.length;
    this.setDataEspecialidades();
    this. setDataSemana();
  }

  consultaTerapeutaAno(ano: number){
    this.terapeutaDataAno = [];
    let diaSplit: string[]; 
    let anofecha: number;
    let mesfecha: number;
    let diafecha: number;

    for(let ficha of this.terapeutaDataTotal){
        diaSplit = ficha.fecha.split('-');
        anofecha = parseInt(diaSplit[2]);
        mesfecha = parseInt(diaSplit[1])-1;
        diafecha = parseInt(diaSplit[0]);
        let diaFicha: Date= new Date(anofecha,mesfecha,diafecha);

        if (anofecha == this.anoConsulta){
            this.terapeutaDataAno.push(ficha.fecha);
            if(diaFicha.getTime() >= this.seisDiasAntes.getTime()){
              this.sumaTotalSemana(diaFicha.getDay());
            }
        }
    }
    this.totalTerapeutaDataAno=this.terapeutaDataAno.length;
    this.setDataEspecialidades();
    this. setDataSemana();
  }

   sumaTotalSemana(dia:number){
     switch(dia) { 
         case 0: { 
            this.totalDomingo++;
            break; 
         } 
         case 1: { 
            this.totalLunes++;
            break; 
         } 
         case 2: { 
            this.totalMartes++;
            break; 
         } 
         case 3: { 
            this.totalMiercoles++;
            break; 
         } 
         case 4: { 
            this.totalJueves++;
            break; 
         } 
         case 5: { 
            this.totalViernes++;
            break; 
         } 
         case 6: { 
            this.totalSabado++;
            break; 
         } 
      } 
  }

  setDataEspecialidades(){
    this.pieChartDataEspecialidades = [this.totalFonoaudiologiaDataAno, this.totalGeneralDataAno, this.totalKinesiologiaDataAno, this.totalPsicologiaDataAno, this.totalTerapeutaDataAno];
    this.totalEspecialidadesDataAno = this.totalFonoaudiologiaDataAno + this.totalGeneralDataAno + this.totalKinesiologiaDataAno + this.totalPsicologiaDataAno + this.totalTerapeutaDataAno;
  }

  setDataSemana(){
    let data1:number = 0;
    let data2:number = 0;
    let data3:number = 0;
    let data4:number = 0;
    let data5:number = 0;
    let data6:number = 0;
    let data7:number = 0;

    switch(this.lineChartLabels[0]) { 
         case 'Domingo': { 
            data1 = this.totalDomingo;
            data2 = this.totalLunes;
            data3 = this.totalMartes;
            data4 = this.totalMiercoles;
            data5 = this.totalJueves;
            data6 = this.totalViernes;
            data7 = this.totalSabado;
            break; 
         } 
         case 'Lunes': { 
            data1 = this.totalLunes;
            data2 = this.totalMartes;
            data3 = this.totalMiercoles;
            data4 = this.totalJueves;
            data5 = this.totalViernes;
            data6 = this.totalSabado;
            data7 = this.totalDomingo;
            break; 
         } 
         case 'Martes': { 
            data1 = this.totalMartes;
            data2 = this.totalMiercoles;
            data3 = this.totalJueves;
            data4 = this.totalViernes;
            data5 = this.totalSabado;
            data6 = this.totalDomingo;
            data7 = this.totalLunes;
            break; 
         } 
         case 'Miercoles': { 
            data1 = this.totalMiercoles;
            data2 = this.totalJueves;
            data3 = this.totalViernes;
            data4 = this.totalSabado;
            data5 = this.totalDomingo;
            data6 = this.totalLunes;
            data7 = this.totalMartes;
            break; 
         } 
         case 'Jueves': { 
            data1 = this.totalJueves;
            data2 = this.totalViernes;
            data3 = this.totalSabado;
            data4 = this.totalDomingo;
            data5 = this.totalLunes;
            data6 = this.totalMartes;
            data7 = this.totalMiercoles;
            break; 
         } 
         case 'Viernes': { 
            data1 = this.totalViernes;
            data2 = this.totalSabado;
            data3 = this.totalDomingo;
            data4 = this.totalLunes;
            data5 = this.totalMartes;
            data6 = this.totalMiercoles;
            data7 = this.totalJueves;
            break; 
         } 
         case 'Sabado': { 
            data1 = this.totalSabado;
            data2 = this.totalDomingo;
            data3 = this.totalLunes;
            data4 = this.totalMartes;
            data5 = this.totalMiercoles;
            data6 = this.totalJueves;
            data7 = this.totalViernes;
            break; 
         } 
      } 

    
    this.lineChartData = [{ data: [data1, data2, data3, data4, data5, data6, data7], label: 'Series A' }];
  }


  updateGrafico1(){
    this.inicializaDatos();
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [Math.round(Math.random() * 100), 59, 80, Math.random() * 100, 56, Math.random() * 100, 40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
