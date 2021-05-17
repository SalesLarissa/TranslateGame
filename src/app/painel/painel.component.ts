import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import {FRASES} from './frases-mock'
import {Frase} from '../shared/frase.model'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES
  public instrucao:string = "Traduza a frase:"
  public resposta:string = ''
  public rodada:number= 0
  public rodadaFrase: Frase
  public progresso:number = 0
  public tentativas: number = 3
  @Output() public encerrarJogo = new EventEmitter()

  constructor() {
    this.rodadaFrase = this.frases[this.rodada]
  }

  ngOnInit(): void {}

  ngOnDestroy(){}

  public atualizaResposta(resposta:Event): void{
    this.resposta=((<HTMLInputElement>resposta.target).value)
  }

  public verificarResposta(): void{
   
    if(this.rodadaFrase.FrasePtBr == this.resposta){
      alert("Acertou!")
      this.progresso = this.progresso + (100/this.frases.length)
   if(this.rodada === 3){this.encerrarJogo.emit('vitoria')}
      this.rodada++
      this.rodadaFrase = this.frases[this.rodada]
      this.resposta = ''

    }else{
      this.tentativas--
    
      if(this.tentativas === -1){this.encerrarJogo.emit('derrota')}
    }
  }
}
