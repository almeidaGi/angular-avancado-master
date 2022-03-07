import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';
import { Entry } from './entry.model';


@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private apiPath: string = "api/entryes"

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
  }
  getById(id: number): Observable<Entry> {
  
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }
  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, entry).pipe(      
      map(this.jsonDataToEntry),
      catchError(this.handleError)
    )
  }
  update(entry: Entry): Observable<Entry>{

    const url = `${this.apiPath}/${entry.id}`;
    return  this.http.put( url, entry).pipe(
      catchError(this.handleError),
      map(()=> entry)
    )
  }
  delete(id: number): Observable<any>{    
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private jsonDataToEntries(jsonData: any[]): Entry[] {   
    const entryes: Entry[] = [];
    jsonData.forEach(element => {
      const entry = Object.assign( new Entry , element);
      entryes.push(entry);
    });
    return entryes;
  };
  private handleError(error: any): Observable<any> {   
    console.log("ERRO NA REQUISIÇÃO =>", error);
    return throwError(error);
  }
  private jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }
}