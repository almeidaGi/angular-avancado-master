import { Injectable, Injector } from '@angular/core';
import { baseResouceService } from 'src/app/shared/services/base-resource.service';
import { Category } from './category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService extends baseResouceService<Category>{
  constructor(injector: Injector) 
  {super('api/categories', injector, Category.formJson  ) }
}
