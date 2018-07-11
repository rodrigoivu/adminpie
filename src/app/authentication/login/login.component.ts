import * as $ from 'jquery';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { UsuarioService } from '../../services/service.index';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, AfterViewInit {
   email: string;
   recuerdame: boolean = false; 

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  ngOnInit() {

    this.email = localStorage.getItem('email') || ''; //si tiene la opcion de recuerdame y está guardado el email en el local storage
    if ( this.email.length >1 ){
      this.recuerdame = true;
    }
  }

  ngAfterViewInit() {
    $(function() {
      $('.preloader').fadeOut();
    });

    $('#to-recover').on('click', function() {
      $('#loginform').slideUp();
      $('#recoverform').fadeIn();
    });
  }

  onLoggedin() {
    localStorage.setItem('isLoggedin', 'true');
  }

  //Llamar al servicio de login
  ingresar( forma: NgForm){

    var gethash= true; //determina si se pide el Token o no

    if(!forma.valid){
      return;
    }

    let usuario = new User(null, forma.value.email, forma.value.password);
   
    this._usuarioService.login( usuario, forma.value.recuerdame, gethash)
                  .subscribe( resp => this.router.navigate(['/starter']));

  }
}