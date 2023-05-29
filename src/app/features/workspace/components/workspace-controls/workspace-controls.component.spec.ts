import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { WorkspaceControlsComponent } from './workspace-controls.component';

describe('WorkspaceControlsComponent', () => {
  let component: WorkspaceControlsComponent;
  let fixture: ComponentFixture<WorkspaceControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspaceControlsComponent],
      imports: [StoreModule.forRoot({}), ToastrModule.forRoot()],
      providers: [{ provide: ToastrService, useValue: null }],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
