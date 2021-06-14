import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { TransactionService } from '../../core/services/transaction.service';


import { TransferFormComponent } from './components/transfer-form/transfer-form.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionsPageComponent } from './pages/transactions-page.component';

const COMPONENTS = [TransferFormComponent, TransactionsComponent, TransactionsPageComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [SharedModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: COMPONENTS,
  providers: [TransactionService],
  bootstrap: [],
})
export class TransactionModule {}
