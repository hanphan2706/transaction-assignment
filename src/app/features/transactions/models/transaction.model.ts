export class TransactionFormData {
  fromAccount!: string;
  toAccount!: string;
  amount!: string;
  balance!: number;
}

export class TransactionDates {
    dates!: ValueDate;
}

class ValueDate {
  valueDate!: number;
}

class AmountCurrency {
  amount!: number;
  currencyCode!: string;
}

class TransactionDetail {
  amountCurrency!: AmountCurrency;
  type!: string;
  creditDebitIndicator!: string;
}

class Merchant {
  name!: string;
  accountNumber!: string;
}

export class Transaction {
  categoryCode!: string;
  dates!: ValueDate;
  transaction!: TransactionDetail;
  merchant!: Merchant;
}

export class TransactionResponse {
  data!: Array<Transaction>;
}