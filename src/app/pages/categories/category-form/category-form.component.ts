import { Component, Injector} from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category>{
  // descriptionCategorySmall!: string;
  nameCategory!: string;

  constructor(protected categoryService: CategoryService, override injector: Injector,  override toastr: ToastrService,){ 
    super(injector, new Category(), categoryService, Category.formJson, toastr )
  }
 
  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: [null],
    })
  }
 
  get name(): any { return this.resourceForm.get('name'); }
  get description(): any { return this.resourceForm.get('description'); }
 
  override editionPageTitle(): string {
     this.nameCategory = "Editando Categoria: " + this.resource.name || "";
    return this.nameCategory  ;
  }
  override creationPageTitle(): string{
    return this.nameCategory = "Nova Categoria";
  } 
}
