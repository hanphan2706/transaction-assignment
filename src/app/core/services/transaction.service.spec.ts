import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TransactionService } from './transaction.service';
import {
  TransactionResponse,
  Transaction,
} from '../../features/transactions/models/transaction.model';
import { API_URL } from '../constants';

describe('TransactionService', () => {
  let httpTestingController: HttpTestingController;
  let transactionService: TransactionService;
  let transactionResponse: TransactionResponse;
  let result: TransactionResponse;

  const mockedTransaction: Transaction = {
    categoryCode: '#c12020',
    dates: {
      valueDate: Date.now(),
    },
    transaction: {
      amountCurrency: {
        amount: 10,
        currencyCode: 'EUR',
      },
      type: 'Online Transfer',
      creditDebitIndicator: 'DBIT',
    },
    merchant: {
      name: 'Backbase',
      accountNumber: 'SI64397745065188826',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    transactionResponse = {
      data: [mockedTransaction],
    };
  });

  beforeEach(inject([TransactionService], (service: TransactionService) => {
    transactionService = service;
  }));

  it('getTransactions should return data', () => {
    transactionService.getTransactions().subscribe((t) => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: API_URL + 'transactions',
    });

    req.flush(transactionResponse);

    expect(result.data[0]).toEqual(mockedTransaction);
  });
});
