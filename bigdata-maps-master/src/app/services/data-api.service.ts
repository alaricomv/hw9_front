import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Denues } from '../models/denues';
import { Estados } from '../models/estados';
import { Municipios } from '../models/municipios';
import { Unidades } from '../models/unidades';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

 

  //apiURL = 'http://localhost:10010/';
  apiURL = 'http://104.198.244.0:8080/api/auth/';
  
  
  constructor(
    private http: HttpClient,
  ) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'

    })
  }  

  
  getEstados(): Observable<Estados> {
    console.log("estados: " + this.apiURL);
    return this.http.get<Estados>(this.apiURL + 'estados', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }   



  getMunicipios(idestado): Observable<Municipios> {
    console.log("municipios: " + this.apiURL);
    return this.http.get<Municipios>(this.apiURL + 'municipios?idestado=' + idestado, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }   


  getUnidades(): Observable<Unidades> {
    console.log("empresas: " + this.apiURL);
    return this.http.get<Unidades>(this.apiURL + 'categorias', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  getEscuelas(): Observable<Unidades> {
    console.log("empresas: " + this.apiURL);
    return this.http.get<Unidades>(this.apiURL + 'categoria_escuelas', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getComercios(): Observable<Unidades> {
    console.log("empresas: " + this.apiURL);
    return this.http.get<Unidades>(this.apiURL + 'categoria_comercios', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getHospitales(): Observable<Unidades> {
    console.log("empresas: " + this.apiURL);
    return this.http.get<Unidades>(this.apiURL + 'categoria_hospitales', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  getDenues(idestado, idmunicipio, tipo): Observable<Denues> {
    console.log("denues: " + this.apiURL + idestado);
    return this.http.get<Denues>(this.apiURL + 'empresas?idestado=' + idestado +
    '&idmunicipio=' + idmunicipio + '&tipo=' + tipo, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  getEscuelascompleto(idestado, idmunicipio, tipo): Observable<Denues> {
    console.log("escuelastodo: " + this.apiURL + idestado);
    return this.http.get<Denues>(this.apiURL + 'escuelas?idestado=' + idestado +
    '&idmunicipio=' + idmunicipio + '&tipo=' + tipo, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  getComerciosCompleto(idestado, idmunicipio, tipo): Observable<Denues> {
    console.log("escuelastodo: " + this.apiURL + idestado);
    return this.http.get<Denues>(this.apiURL + 'comercio?idestado=' + idestado +
    '&idmunicipio=' + idmunicipio + '&tipo=' + tipo, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }   

  getHospitalesCompleto(idestado, idmunicipio, tipo): Observable<Denues> {
    console.log("escuelastodo: " + this.apiURL + idestado);
    return this.http.get<Denues>(this.apiURL + 'hospitales?idestado=' + idestado +
    '&idmunicipio=' + idmunicipio + '&tipo=' + tipo, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }   

   // Error handling 
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
