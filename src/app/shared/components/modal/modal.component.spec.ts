import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger onClose when close btn clicked', () => {
    spyOn(component.onClose, 'emit');
    let closeBtn = fixture.debugElement.query(By.css('.lni-close'));
    closeBtn.nativeNode.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.onClose.emit).toHaveBeenCalled();
  });
});
