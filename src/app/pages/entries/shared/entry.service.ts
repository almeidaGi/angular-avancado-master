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
   { super("api/entryes", injetor, Entry.formJson)}

  override create(entry: Entry): Observable<Entry> {   
    return this.setCategoryAndSentToServer(entry, super.create.bind(this))
  }

  override update(entry: Entry): Observable<Entry> {
   return this.setCategoryAndSentToServer(entry, super.update.bind(this))
   
  } 
  private setCategoryAndSentToServer(entry: Entry, sendFn: any): Observable<any>{
    return this.categoryService.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.categoryName = Object.assign(new Category, category).name;        
        return sendFn(entry);
      }))
  }
}
