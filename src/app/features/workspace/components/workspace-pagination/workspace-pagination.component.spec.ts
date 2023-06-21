import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { WorkspaceRoutingModule } from '@features/workspace/workspace-routing.module';
import { StoreModule } from '@ngrx/store';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { WorkspacePaginationComponent } from './workspace-pagination.component';

describe('WorkspacePaginationComponent', () => {
  let component: WorkspacePaginationComponent;
  let fixture: ComponentFixture<WorkspacePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideAnimations()],
      declarations: [WorkspacePaginationComponent],
      imports: [
        StoreModule.forRoot({}),
        WorkspaceRoutingModule,
        NgxCsvParserModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspacePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render panel with labels', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.dsr-pages-top-panel').textContent).toContain('words left:');
    expect(compiled.querySelector('.dsr-pages-top-panel').textContent).toContain('current index:');
    expect(compiled.querySelector('.dsr-pages-top-panel').textContent).toContain('with flag');
  });

  it('should render pages label', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.dsr-pages-list').textContent).toContain('pages:');
  });
});
