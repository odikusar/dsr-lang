import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';
import { WorkspaceFilesComponent } from './workspace-files.component';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('WorkspaceFilesComponent', () => {
  let component: WorkspaceFilesComponent;
  let fixture: ComponentFixture<WorkspaceFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspaceFilesComponent],
      providers: [
        { provide: AngularFireStorage, useValue: null },
        { provide: ToastrService, useValue: null },
      ],
      imports: [StoreModule.forRoot({}), ToastrModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
