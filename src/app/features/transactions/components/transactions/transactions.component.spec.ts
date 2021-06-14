import { SimpleChanges, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionsComponent } from './transactions.component';
import { Transaction } from '../../models/transaction.model';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClientTestingModule],
      declarations: [TransactionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new transfer to the current list of transactions', () => {
    expect(component.transactions.length).toEqual(0);

    const changesObj: SimpleChanges = {
      newTransfer: new SimpleChange('newTransfer', mockedTransaction, true),
    };

    component.ngOnChanges(changesObj);

    expect(component.transactions.length).toEqual(1);
  });

  it('should filter the list of transaction by merchant name', () => {
    component.transactions = [mockedTransaction];
    component.filteredTransactions = [mockedTransaction];
    expect(component.transactions.length).toEqual(1);
    expect(component.filteredTransactions.length).toEqual(1);

    component.handleInputChange({target: {value: 'test'}});
    fixture.detectChanges();
    
    expect(component.transactions.length).toEqual(1);
    expect(component.filteredTransactions.length).toEqual(0);
  });
});
