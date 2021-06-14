import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  onCloseBtnClicked(event: Event): void {
    this.onClose.emit(event);
  }
}
