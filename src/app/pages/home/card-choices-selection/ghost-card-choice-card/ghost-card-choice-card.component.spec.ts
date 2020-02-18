import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GhostCardChoiceCardComponent } from './ghost-card-choice-card.component';

describe('GhostCardChoiceCardComponent', () => {
  let component: GhostCardChoiceCardComponent;
  let fixture: ComponentFixture<GhostCardChoiceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhostCardChoiceCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GhostCardChoiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
