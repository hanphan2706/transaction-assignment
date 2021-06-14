import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TransactionService } from '../../../../core/services/transaction.service';
import { Transaction, TransactionDates } from '../../models/transaction.model';

const getFilteredByKeyword = (
  transactions: Array<Transaction>,
  keyword: string
): Array<Transaction> => {
  return transactions.filter((transaction: Transaction) =>
    transaction.merchant.name.toLowerCase().includes(keyword.toLowerCase())
  );
};

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnChanges {
  @Input() newTransfer!: Transaction;

  transactions: Array<Transaction> = [];
  filteredTransactions: Array<Transaction> = [];
  private currentKeyword: string = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.getTransactions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.newTransfer.currentValue) {
      this.addNewTransferToTransactions(changes.newTransfer.currentValue);
    }
  }

  addNewTransferToTransactions(newTransferValue: Transaction) {
    this.transactions = [newTransferValue, ...this.transactions];
    this.filteredTransactions = getFilteredByKeyword(
      this.transactions,
      this.currentKeyword
    );
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe((res) => {
      if (res && res.data) {
        this.transactions = res.data.sort(
          (a: TransactionDates, b: TransactionDates) =>
            b.dates.valueDate - a.dates.valueDate
        );
        this.filteredTransactions = this.transactions;
      }
    });
  }

  getDate(transactionDate: number): string {
    const day = new Date(transactionDate);
    const date = day.getDate();
    const month = day.toLocaleDateString('default', {
      month: 'short',
    });
    return `${month}. ${date}`;
  }

  handleInputChange(event: any | Event): void {
    const keyword = (event.target as HTMLInputElement).value;
    if (!keyword || keyword.length <= 1)
      this.filteredTransactions = this.transactions;
    this.currentKeyword = keyword;
    if (keyword.length > 1) {
      this.filteredTransactions = getFilteredByKeyword(
        this.transactions,
        keyword
      );
    }
  }
}
