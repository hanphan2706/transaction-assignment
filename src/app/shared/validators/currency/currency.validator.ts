import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MIN_BALANCE } from '../../../features/transactions/constants';

interface BalanceFunc{
  (): number
 }

export function currencyValidator(balanceFunc: BalanceFunc): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const balance = balanceFunc();
    if (balance - control.value < MIN_BALANCE) {
      return { currency: true };
    }
    return null;
  };
}
