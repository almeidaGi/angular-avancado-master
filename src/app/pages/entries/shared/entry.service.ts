import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { baseResouceService } from 'src/app/shared/services/base-resource.service';
import { mergeMap } from 'rxjs/operators';
import { Category } from '../../categories/shared/category.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EntryService extends baseResouceService<Entry>{

  constructor( private categoryService: CategoryService , injetor: Injector)
   { super("api/entryes", injetor)}

  override create(entry: Entry): Observable<Entry> {
    debugger;
    return this.categoryService.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.categoryName = Object.assign(new Category, category).name;        
        return super.create(entry);
      }))
  }

  override update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.categoryName = Object.assign(new Category, category).name;        
        return super.update(entry);
      }))
   
  }

  override jsonDataToResouces(jsonData: any[]): Entry[] {
    const entryes: Entry[] = [];
    jsonData.forEach(element => {
      const entry = Object.assign(new Entry, element);      
      entryes.push(entry);
    });
    return entryes;
  };
  override jsonDataToResouce(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }
}
