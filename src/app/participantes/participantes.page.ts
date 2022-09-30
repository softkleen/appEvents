import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.page.html',
  styleUrls: ['./participantes.page.scss'],
})
export class ParticipantesPage implements OnInit {
id:number;
nome:string;
data:string;
capacidade:number;
ativo:boolean;
isVisit: boolean = false;
visitante: string;
tipos: any[]=[];
totalParticipantes:number=0;
visitantes:any[]=[];
  constructor(private actRoute: ActivatedRoute, 
    private service: ApiService, 
    private alertCrtl: AlertController,
    private toastCrtl:ToastController) { }

  ngOnInit() {
    this.actRoute.params.subscribe((dadosdarota:any)=>{
      this.id = dadosdarota.id;
      this.nome = dadosdarota.nome;
      this.data = dadosdarota.data;
      this.capacidade = dadosdarota.capacidade;
      this.ativo = dadosdarota.ativo;
    });
  }
  ionViewWillEnter(){
    this.atualizaParticipantes();
    this.atualizaVisitantes()
  }
  addParticipante(tipo:string){
    return new Promise(res => {
      let evento = {
        requisicao:"atualizar",
        id: this.id,
        tipo : tipo,
        visitante: this.visitante
      };
    
    this.service.connectApi(evento, "evento.php").subscribe(ret =>{
      if (ret['success']){
        this.visitante="";this.isVisit=false;
        this.atualizaParticipantes();
        this.atualizaVisitantes();
      }
    });
  });
}
atualizaParticipantes(){
  return new Promise(res => {
    this.tipos=[];
    let listatipos = {
      requisicao:"listar_tipo",
      id: this.id
    };
  this.service.connectApi(listatipos, "evento.php").subscribe(ret =>{
    if (ret['success']){
      this.totalParticipantes = 0;
      for(let tipo of ret['result']){
        this.tipos.push(tipo);
        this.totalParticipantes += parseInt(tipo.total_tipo);
      }
    }
  });
});

}
atualizaVisitantes(){
  return new Promise(res => {
    this.visitantes=[];
    let listarVisitante = {
      requisicao:"listar_visitante",
      id: this.id
    };
  this.service.connectApi(listarVisitante, "evento.php").subscribe(ret =>{
    if (ret['success']){
      for(let visitante of ret['result']){
        this.visitantes.push(visitante);
        
      }
    }
  });
});

}
remover(tipo:string){
  return new Promise(res => {
    let remover = {
      requisicao:"remover_participante",
      id: this.id,
      tipo:tipo
    };
  this.service.connectApi(remover, "evento.php").subscribe(ret =>{
    if (ret['success']){
      this.atualizaParticipantes();
    }
  });
});
}
excluirVisitante(id:any){
  return new Promise(res => {
    let remover = {
      requisicao:"excluir_visitante",
      id: id
    };
  this.service.connectApi(remover, "evento.php").subscribe(ret =>{
    if (ret['success']){
      this.atualizaVisitantes();
    }
  });
});
}
async verificaVisitante(tipo:string){
  if (this.isVisit){
    if (this.visitante==""){
      const toast = await this.toastCrtl.create({
       message:"Digite o nome do Visitante ",
       color:"secondary",
       duration:2000
     });
    toast.present();
    }else{
      this.addParticipante(tipo);
    }
  }else {
      this.addParticipante(tipo);
    }
  }
  async addVisitante(id:any){
   const alerta = this.alertCrtl.create({
    header:'Adicionar visitante presente',
    inputs: [
      {name: 'nome',type: 'text', placeholder: 'digite o nome do visitante' }
    ],
    buttons:[
      {text:'Cancelar',role:'cancel', cssClass:"secondary", 
      handler: ()=>{
        // caso o usuário clique em cancelar???
    
      }}
    ,{
      text: 'Ok', 
      handler: (form) =>{
       this.addVisitantePresente(id, form.nome);
      }
    }
  ]
   });
   (await alerta).present()
  }
  addVisitantePresente(id:any,nome:string ){
    
    return new Promise(res => {
      let add = {
        requisicao:"add_visitante",
        id: this.id,
        nome:nome
      };
    this.service.connectApi(add, "evento.php").subscribe(ret =>{
      if (ret['success']){
        this.atualizaVisitantes();
      }
    });
  });
  }
}
