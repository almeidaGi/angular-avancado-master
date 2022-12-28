import { Component, Input,  } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent {
  @Input('form-control') formControl: FormControl;
//  form: boolean;
constructor(){}

  public get errorMessage(): string | null{
    if(this.mustShowErrorMessage())
    return this.getErrorMessage();
    else 
      return null;
  }
  private mustShowErrorMessage(): boolean{
    return this.formControl?.errors?.['required'] || this.formControl?.errors?.['minlength'] ;
  }

  private getErrorMessage(): string | null { 
    let message = null;
    if( this.formControl?.errors?.['required']  ) {return  message = 'Campo Obrigatório'; }
 
    if(this.formControl?.errors?.['minlength']) {
     const minlength = this.formControl?.errors?.['minlength'].requiredLength;
     return message = `Campo deve ter no minímo ${ minlength } caracteres.`;
    }
  return message
  }
}
