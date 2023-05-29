import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceControlsComponent } from './workspace-controls.component';

describe('WorkspaceControlsComponent', () => {
  let component: WorkspaceControlsComponent;
  let fixture: ComponentFixture<WorkspaceControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspaceControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
