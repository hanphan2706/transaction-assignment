import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent {
  @Input() disabled: boolean = true;
  @Output() submitForm: EventEmitter<any> = new EventEmitter();

  triggerSubmit(event: Event): void {
    this.submitForm.emit(event);
  }

}
