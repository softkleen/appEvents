import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mostrar-usuario',
  templateUrl: './mostrar-usuario.page.html',
  styleUrls: ['./mostrar-usuario.page.scss'],
})
export class MostrarUsuarioPage implements OnInit {
id:number;
nome:string='';
usuario:string='';
nivel:string='';
  constructor(
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((veionarota:any)=>{
      this.id = veionarota.id;
      this.nome = veionarota.nome;
      this.usuario = veionarota.usuario;
      this.nivel = veionarota.nivel;
    });
  }

}
