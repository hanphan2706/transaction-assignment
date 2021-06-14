import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TransferFormComponent } from './transfer-form.component';

describe('TransferFormComponent', () => {
  let fixture: ComponentFixture<TransferFormComponent>;
  let transferFormComponent: TransferFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [TransferFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFormComponent);
    transferFormComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(transferFormComponent).toBeTruthy();
  });

  it('should show error if the toAcount input is not filled', () => {
    fixture.detectChanges();
    transferFormComponent.transferForm.controls['toAccount'].markAsTouched();
    transferFormComponent.transferForm.controls['toAccount'].setValue('');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#toAccountErrorRequired'))).toBeTruthy();
  });

  it('should show error if the amount input is not filled', () => {
    fixture.detectChanges();
    transferFormComponent.transferForm.controls['amount'].markAsTouched();
    transferFormComponent.transferForm.controls['amount'].setValue('');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#amountErrorRequired'))).toBeTruthy();
  });

  it('should not show error if the amount input is decimals', () => {
    fixture.detectChanges();
    transferFormComponent.transferForm.controls['amount'].setValue(10.10);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#amountErrorPattern'))).not.toBeTruthy();
  });

  it('should trigger onSubmitTransferForm if transfer form is submitted', () => {
    spyOn(transferFormComponent.onSubmitTransferForm, 'emit');
    fixture.detectChanges();

    transferFormComponent.transferForm.controls['toAccount'].setValue('Backbase');
    transferFormComponent.transferForm.controls['amount'].setValue(10.10);
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);     
    fixture.detectChanges();

    const modalReviewEl = fixture.debugElement.query(By.css('app-modal'));
    expect(modalReviewEl).toBeTruthy();
    const btnSendTransferEl = fixture.debugElement.query(By.css('.btn-send-transfer'));
    expect(btnSendTransferEl).toBeTruthy();

    btnSendTransferEl.nativeNode.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(transferFormComponent.onSubmitTransferForm.emit).toHaveBeenCalled();
  });
});
