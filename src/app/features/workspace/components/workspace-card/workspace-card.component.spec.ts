import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideAnimations } from '@angular/platform-browser/animations';
import { WorkspaceCardComponent } from './workspace-card.component';

describe('WorkspaceCardComponent', () => {
  let component: WorkspaceCardComponent;
  let fixture: ComponentFixture<WorkspaceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideAnimations()],
      declarations: [WorkspaceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
