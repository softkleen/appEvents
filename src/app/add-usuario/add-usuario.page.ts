import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { renderHiddenInput } from '@ionic/core/dist/types/utils/helpers';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {
id: number ;
nome: string = "";
usuario: string="";
senha: string="";
nivel: string="";
  constructor(
    private service: PostService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((dadosdarota:any)=>{
      this.id = dadosdarota.id;
      this.nome = dadosdarota.nome;
      this.usuario = dadosdarota.usuario;
      this.senha = dadosdarota.senha; 
      this.nivel = dadosdarota.nivel;

    });
  }
  
  cadastrar(){
    return new Promise(res =>{
      let dados = {
        requisicao:'add',
        nome:this.nome,
        usuario:this.usuario,
        senha:this.senha,
        nivel: this.nivel,
        avatar: 'semfoto.png'
      }
      //console.log(dados);
      this.service.dadosApi(dados, "api_usuario.php").subscribe(data=>{
        console.log(data)
        if(data['success']){
          this.router.navigate(['usuarios']);
          this.id=null;this.nome="";this.usuario="";this.senha="";this.nivel="";
        }
      });
    });
  }

  editar(){
    return new Promise(ret=>{
      let dados = {
        requisicao:'editar',
        nome: this.nome,
        usuario:this.usuario,
        senha:this.senha,
        nivel:this.nivel,
        id:this.id
      };
      this.service.dadosApi(dados,"api_usuario.php").subscribe(data=>{
        if(data['success']){
          this.router.navigate(['usuarios']);
        }
      });
    });
  }

}
