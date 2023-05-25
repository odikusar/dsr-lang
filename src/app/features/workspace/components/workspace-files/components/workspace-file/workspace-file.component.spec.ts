import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceFileComponent } from './workspace-file.component';

describe('WorkspaceFileComponent', () => {
  let component: WorkspaceFileComponent;
  let fixture: ComponentFixture<WorkspaceFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
