import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postCadastro(data : any){
    return this.http.post<any>("http://localhost:3000/usuarios/", data)
    .pipe(map(( res:any )=> {
      return res;
    }))
  }
  getCadastro(){
    return this.http.get<any>("http://localhost:3000/usuarios/")
    .pipe(map(( res:any )=> {
      return res;
    }))
  }
  updateCadastro(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/usuarios/"+id, data)
    .pipe(map(( res:any )=> {
      return res;
    }))
  }
  deleteCadastro(id : number){
    return this.http.delete<any>("http://localhost:3000/usuarios/"+id)
    .pipe(map(( res:any )=> {
      return res;
    }))
  }

}
