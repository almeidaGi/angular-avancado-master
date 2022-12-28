import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-serve-error-message',
  templateUrl: './serve-error-message.component.html',
  styleUrls: ['./serve-error-message.component.scss']
})
export class ServeErrorMessageComponent {
  @Input('server-error-messages')  serverErrorMessages!: string[];

}
