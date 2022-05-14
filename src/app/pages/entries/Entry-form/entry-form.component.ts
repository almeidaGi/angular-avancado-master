import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit{

  // currentAction!: string;
  //entryForm!: FormGroup;
  // pageTitle!: string;
  // descriptionEntrySmall!: string;
  // serverErrorMessages!: string[];
  // submittingForm = false;
  // entry: Entry = new Entry();
  // entryList: Entry[] = [];
  // getTypes: any;
  categories!: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    redix: ',',
  }
  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    protected entryService: EntryService,
    private categoryService: CategoryService,
    override injector: Injector,
    override toastr: ToastrService,
  ) { super(injector, new Entry(), entryService, Entry.formJson, toastr) }

  override ngOnInit(): void {
    this.loadCategory();
    super.ngOnInit();
  }
  override buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      description: [null],
      type: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      date: new FormControl(null, [Validators.required]),
      paid: new FormControl(true, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),

    })
  }
  get type(): any { return this.resourceForm.get('type'); }
  get name(): any { return this.resourceForm.get('name'); }
  get description(): any { return this.resourceForm.get('description'); }
  get amount(): any { return this.resourceForm.get('amount'); }
  get date(): any { return this.resourceForm.get('date'); }
  get paid(): any { return this.resourceForm.get('paid'); }
  get categoryId(): any { return this.resourceForm.get('categoryId'); }
  get category(): any { return this.resourceForm.get('category'); }


  private loadCategory() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
  }
  override editionPageTitle(): string {
    this.pageTitle = "Editando Lançamento: " + this.resource.name || "";
    return this.pageTitle;
  }
  override creationPageTitle(): string {
    return this.pageTitle = "Novo Lançamento";
  }

}
