import { baseResouceModel } from "../models/base-resource.model";
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injector } from "@angular/core";

export abstract class baseResouceService<T extends baseResouceModel>{
    protected http: HttpClient;
  
    constructor(
      protected apiPath: string,
      protected injector: Injector,      
      protected jsonDataToResouceFn: (jsonData: any) => T
      ){
      this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
          catchError(this.handleError),
          map(this.jsonDataToResouces.bind(this)),
        )
      }
      getById(id: number): Observable<T> {      
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(          
          map(this.jsonDataToResouce.bind(this)),
          catchError(this.handleError)
        )
      }
      create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(      
          map(this.jsonDataToResouce.bind(this)),
          catchError(this.handleError)
        )
      }
      update(resource: T): Observable<T>{    
        const url = `${this.apiPath}/${resource.id}`;
        return  this.http.put( url, resource).pipe(
          catchError(this.handleError),
          map(()=> resource)
        )
      }
      delete(id: number): Observable<any>{    
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
          catchError(this.handleError),
          map(() => null)
        )
      }
      protected jsonDataToResouces(jsonData: any[]): T[] {    
        const resouces: T[] = [];
        jsonData.forEach(element => resouces.push(this.jsonDataToResouceFn(element)));
        return resouces;
      }
      protected handleError(error: any): Observable<any> {   
        console.log("ERRO NA REQUISIÇÃO =>", error);
        return throwError(error);
      }
      protected jsonDataToResouce(jsonData: any): T {
        return this.jsonDataToResouceFn(jsonData);
      }
}