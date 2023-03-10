import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ApiService } from '../BackEnd/api.service';
import { CadastroModel } from "./cadastro.model";


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formValue!: FormGroup;
  cadastroModelObj : CadastroModel = new CadastroModel();
  cadastroData !: any;
  verAdicionar! : boolean;
  verAlterar! : boolean;

  constructor(private formbuilder: FormBuilder,
    private api : ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nome : new FormControl ('', [Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(20)]),
      email : new FormControl ('', [Validators.required, 
        Validators.email]),
      cpf : new FormControl ('', [Validators.required, 
        Validators.min(11), 
        Validators.max(11),]),
      telefone : new FormControl ('', [ Validators.required, 
        Validators.pattern("^[0-9]*$"), Validators.minLength(10), 
        Validators.maxLength(11)]),
      celular  : new FormControl ('', [ Validators.required, 
        Validators.pattern("^[0-9]*$"), 
        Validators.minLength(11), 
        Validators.maxLength(11)]),
    })
    this.getAllCadastros();
  }

  clickAdicionar(){
    this.formValue.reset();
    this.verAdicionar = true;
    this.verAlterar = false;
  }

  postCadastroDetalhes(){
    this.cadastroModelObj.nome = this.formValue.value.nome;
    this.cadastroModelObj.email = this.formValue.value.email;
    this.cadastroModelObj.cpf = this.formValue.value.cpf;
    this.cadastroModelObj.telefone = this.formValue.value.telefone;
    this.cadastroModelObj.celular = this.formValue.value.celular;

    this.api.postCadastro(this.cadastroModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Contribuinte adicionado com sucesso!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllCadastros();
    })
  }
  getAllCadastros(){
    this.api.getCadastro()
    .subscribe(res=>{
      this.cadastroData = res;
    })
  }

  deleteCadastros(row : any){
    this.api.deleteCadastro(row.id)
    .subscribe(res=>{
      console.log(res);
      alert("Contribuinte deletado!");
      this.getAllCadastros();
    })

  }
  ativarEditar(row: any){
    this.verAdicionar = false;
    this.verAlterar = true;
    this.cadastroModelObj.id = row.id;
    this.formValue.controls['nome'].setValue(row.nome);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['cpf'].setValue(row.cpf);
    this.formValue.controls['telefone'].setValue(row.telefone);
    this.formValue.controls['celular'].setValue(row.celular);
  }
  updateCadastroDetalhes(){
    this.cadastroModelObj.nome = this.formValue.value.nome;
    this.cadastroModelObj.email = this.formValue.value.email;
    this.cadastroModelObj.cpf = this.formValue.value.cpf;
    this.cadastroModelObj.telefone = this.formValue.value.telefone;
    this.cadastroModelObj.celular = this.formValue.value.celular;
    
    this.api.updateCadastro(this.cadastroModelObj, this.cadastroModelObj.id)
    .subscribe(res=>{
      console.log(res);
      alert("Altera????o conclu??da!");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllCadastros();
    })
  }

}
