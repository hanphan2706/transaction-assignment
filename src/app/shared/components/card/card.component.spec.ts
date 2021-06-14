import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render icon correctly', () => {
    const iconEl = fixture.nativeElement.querySelector('i');
    const mockedIcon = 'list';
    const expectedIconClass = `lni-${mockedIcon}`;
    component.icon = mockedIcon;
    fixture.detectChanges();
    expect(iconEl.classList).toContain(expectedIconClass);
  });

  it('should has border bottom', () => {
    const cardBodyEl = fixture.debugElement.query(By.css('.app-card-body'));
    const expectedClass = 'has-border-bottom';
    component.hasBorderBottom = true;
    fixture.detectChanges();
    expect(cardBodyEl.nativeNode.classList).toContain(expectedClass);
  });
});
