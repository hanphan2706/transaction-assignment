import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {
  TransactionFormData,
  Transaction,
} from '../../models/transaction.model';
import { currencyValidator } from '../../../../shared/validators/currency/currency.validator';
import {
  CURRENT_AMOUNT,
  CURRENT_AMOUNT_TEXT,
  CURRENCY_PATTERN,
} from '../../constants';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnInit {
  @ViewChild('modalReview') modalReview!: TemplateRef<any>;
  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;

  @Output() onSubmitTransferForm: EventEmitter<any> = new EventEmitter();

  transactionFormData: TransactionFormData = {
    fromAccount: CURRENT_AMOUNT_TEXT + CURRENT_AMOUNT,
    toAccount: '',
    amount: '',
    balance: CURRENT_AMOUNT,
  };

  transferForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initTransferForm();
  }

  initTransferForm() {
    this.transferForm = this.formBuilder.group({
      toAccount: [this.transactionFormData.toAccount, Validators.required],
      amount: [
        this.transactionFormData.amount,
        [
          Validators.required,
          Validators.pattern(CURRENCY_PATTERN),
          currencyValidator(() => this.transactionFormData.balance),
        ],
      ],
    });
  }

  onSubmit(): void {
    let view = this.modalReview.createEmbeddedView(null);
    this.vc.insert(view);
  }

  onCloseReviewModal(): void {
    this.vc.clear();
  }

  onSendTransfer(): void {
    const newTransfer: Transaction = {
      categoryCode: '#c12020',
      dates: {
        valueDate: Date.now(),
      },
      transaction: {
        amountCurrency: {
          amount: this.amount.value,
          currencyCode: 'EUR',
        },
        type: 'Online Transfer',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: this.toAccount.value,
        accountNumber: 'SI64397745065188826',
      },
    };
    this.onSubmitTransferForm.emit(newTransfer);
    this.updateBalance();
    this.transferForm.reset();
    this.onCloseReviewModal();
  }

  updateBalance() {
    const balance =
      Math.floor((this.transactionFormData.balance - this.amount.value) * 100) /
      100;
    this.transactionFormData.balance = balance;
    this.transactionFormData.fromAccount = CURRENT_AMOUNT_TEXT + balance;
  }

  get toAccount() {
    return this.transferForm.get('toAccount')!;
  }

  get amount() {
    return this.transferForm.get('amount')!;
  }
}
