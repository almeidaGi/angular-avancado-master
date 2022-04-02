import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { Category } from '../shared/category.module';
import { CategoryService } from '../shared/category.service';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction!: string;
  categoryForm!: FormGroup;
  pageTitle!: string;
  descriptionCategorySmall!: string;
  serverErrorMessages!: string[];
  submittingForm = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }
  public submitForm() {
    this.submittingForm = true;
    if (this.currentAction == "new") {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }
  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new"
    } else
      this.currentAction = "edit"
  }
  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      description: [null],
    })
  }

  get name(): any { return this.categoryForm.get('name'); }
  get description(): any { return this.categoryForm.get('description'); }

  private loadCategory() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get('id')!))
      ).subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(this.category)
        },
        (error) => alert('Ocorreu um erro no servidor, por favor tente mais tarde.')
      )
    }
  }
  private setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = 'Cadastro de nova categoria'
    } else {
      const nameCategory = this.category.name || "";
      const descriptionSmall = this.category.description || "";
      this.pageTitle = nameCategory;
      this.descriptionCategorySmall = descriptionSmall
    }
  }
  private updateCategory() {
    debugger;
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.update(category).subscribe(
      category => this.actionFormSuccess(category),
      error => this.actionsForError(error)
    )
  }
  
  public createCategory() {
    debugger;
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(category).subscribe(
      category => this.actionFormSuccess(category),
      error => this.actionsForError(error)
    )

  }
  private actionFormSuccess(category: Category) {
    if (category.id != this.category.id) {
      this.toastr.success("Categoria criada com sucesso");
      this.router.navigateByUrl("categories", { skipLocationChange: true }).then(
        () => this.router.navigate(["categories", category.id, "edit"])
      )
    } else {
      this.toastr.success(" Categoria atualizada com sucesso ");

      this.router.navigateByUrl("categories", { skipLocationChange: true }).then(
        () => this.router.navigate(["categories", category.id, "edit"])
      )
    }
  }
  private actionsForError(error: any) {
    this.toastr.error("Ocorreu um erro ao processar a sua solicitação");
    this.submittingForm = false;
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }
    else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor, por favor, tente mais."]
    }
  }
}
