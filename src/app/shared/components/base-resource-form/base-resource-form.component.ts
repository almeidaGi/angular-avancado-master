import {  OnInit, AfterContentChecked, Injector, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { BaseResouceModel } from '../../models/base-resource.model';
import { BaseResouceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResouceModel> implements OnInit, AfterContentChecked {

  currentAction!: string;
  resourceForm!: FormGroup;
  pageTitle!: string;
  descriptionCategorySmall!: string;
  serverErrorMessages!: string[];
  submittingForm = false;
  protected route!: ActivatedRoute;
  protected router!: Router;  
  protected formBuilder!: FormBuilder; 


  constructor(
    protected injector: Injector,
    public resource: T, 
    protected resourceService: BaseResouceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T,
    protected toastr: ToastrService,
   
  ) {
      this.route = this.injector.get(ActivatedRoute);
      this.router = this.injector.get(Router);
      this.formBuilder = this.injector.get(FormBuilder);
   }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }
  public submitForm() {
    this.submittingForm = true;
    if (this.currentAction == "new") {
      this.createResource();
    } else {
      this.updateResource();
    }
  }
  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new"
    } else
      this.currentAction = "edit"
  }
//   get name(): any { return this.categoryForm.get('name'); }
//   get description(): any { return this.categoryForm.get('description'); }

  protected loadResource() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get('id')!))
      ).subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(this.resource)
        },
        (error) => alert('Ocorreu um erro no servidor, por favor tente mais tarde.')
      )
    }
  }
  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = this.creationPageTitle();
    } else {
    //   const nameCategory = this.category.name || "";
    //   const descriptionSmall = this.category.description || "";
      this.pageTitle = this.editionPageTitle();
     // this.descriptionCategorySmall = descriptionSmall
    }
  }
  protected creationPageTitle(): string{
    return "Novo";
  } 
 protected editionPageTitle(): string{
    return "Edição";
  }
  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)
    this.resourceService.update(resource).subscribe({
      next: (resource) => this.actionFormSuccess(resource),
      error: (error) => this.actionsForError(error)
    })
  }
  
  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)
    this.resourceService.create(resource).subscribe({
      next: (resource) => this.actionFormSuccess(resource),
      error: (error) => this.actionsForError(error)
    })

  }
  protected actionFormSuccess(resource: T) {
      this.toastr.success("Solicitação atualizada com sucesso!");
      const baseComponentPath = this.route.snapshot.parent?.url[0].path as string;
      console.log(baseComponentPath);
    // if (category.id != this.category.id) {
    //   this.toastr.success("Categoria criada com sucesso");
    //   this.router.navigateByUrl("categories", { skipLocationChange: true }).then(
    //     () => this.router.navigate(["categories", category.id, "edit"])
    //   )
    // } else {
    //   this.toastr.success(" Categoria atualizada com sucesso ");

       this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
         () => this.router.navigate([baseComponentPath, resource.id, "edit"])
      )
     }
  
  protected actionsForError(error: any) {
    this.toastr.error("Ocorreu um erro ao processar a sua solicitação");
    this.submittingForm = false;
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }
    else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor, por favor, tente mais."]
    }
  }
  protected abstract buildResourceForm(): void;
}
