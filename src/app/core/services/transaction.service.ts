import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TransactionResponse } from '../../features/transactions/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(public httpService: HttpService) {}

  getTransactions(): Observable<TransactionResponse> {
    return this.httpService
      .get('transactions')
      .pipe(
        catchError((): Observable<TransactionResponse> => {
          return this.httpService.getMocks('transactions');
        })
      )   
  }
}
