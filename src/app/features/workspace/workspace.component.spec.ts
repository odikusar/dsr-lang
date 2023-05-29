import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { WorkspaceComponent } from './workspace.component';

import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('WorkspaceComponent', () => {
  let component: WorkspaceComponent;
  let fixture: ComponentFixture<WorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireStorage, useValue: null },
        { provide: ToastrService, useValue: null },
      ],
      declarations: [WorkspaceComponent],
      imports: [CommonModule, ReactiveFormsModule, StoreModule.forRoot({}), ToastrModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
