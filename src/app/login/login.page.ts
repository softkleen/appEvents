import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
usuario: string="";
senha: string=""; 
  constructor(
    private service: PostService,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }
  login(){
    let dados = {
      requisicao: 'login',
      usuario: this.usuario,
      senha: this.senha
    }  
    //console.log(dados)
    // (dados) é o que está sendo passado para a API
    // (data) é o que está sendo retornado da API
    this.service.dadosApi(dados,'api.php').subscribe( async data =>{
      console.log(data);
      if(data['success']){
        if(data['result']['nivel']=='admin' || data['result']['nivel']=='caixa'){
          this.router.navigate(['usuarios']);
        }else{
          this.router.navigate(['folder']);
        }
        const toast = await this.toastCtrl.create({
          message: "Login efetuado com sucesso",
          position:'top',
          color:'success',
          duration:2500
        });
        toast.present();
      }else{
        const toast = await this.toastCtrl.create({
          message: data['msg'],
          position:'bottom',
          color:'danger',
          duration:2500
        });
        toast.present();
      }
    });
  }

}
