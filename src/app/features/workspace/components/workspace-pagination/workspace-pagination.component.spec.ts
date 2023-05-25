import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacePaginationComponent } from './workspace-pagination.component';

describe('WorkspacePaginationComponent', () => {
  let component: WorkspacePaginationComponent;
  let fixture: ComponentFixture<WorkspacePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspacePaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspacePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
