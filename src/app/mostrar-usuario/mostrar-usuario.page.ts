import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/services/post.service';

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
avatar:any='';
  constructor(
    private actRoute: ActivatedRoute,
    private service: PostService
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((veionarota:any)=>{
      this.id = veionarota.id;
      this.nome = veionarota.nome;
      this.usuario = veionarota.usuario;
      this.nivel = veionarota.nivel;
    });
  }
  gravaavatar(){
    console.log(this.avatar);
    return new Promise(ret =>{
      let dados = {
        requisicao:"avatar",
        nome:this.id, 
        limit:this.avatar
      };
      this.service.dadosApi(dados,'api_usuario.php').subscribe(data =>{
        
        }
      );
    });
  }

}
