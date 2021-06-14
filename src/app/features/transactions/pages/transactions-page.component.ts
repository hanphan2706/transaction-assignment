import { Component } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss']
})
export class TransactionsPageComponent {
  newTransfer!: Transaction;
  
  handleSubmitTransferForm(data: Transaction): void {
    this.newTransfer = data;
  }
}
