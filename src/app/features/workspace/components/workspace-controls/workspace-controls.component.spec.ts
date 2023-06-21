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

  it('should render top level control buttons with labels', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('[data-qa="topLevelControls"]').textContent).toContain(
      'Previous'
    );
    expect(compiled.querySelector('[data-qa="topLevelControls"]').textContent).toContain(
      'Show Answer'
    );
    expect(compiled.querySelector('[data-qa="topLevelControls"]').textContent).toContain(
      'Next Word'
    );
  });

  it('should render middle level control buttons with labels', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('[data-qa="middleLevelControls"]').textContent).toContain(
      'Translation by default'
    );
    expect(compiled.querySelector('[data-qa="middleLevelControls"]').textContent).toContain(
      'Repeat Again'
    );
  });

  it('should render bottom level control buttons with labels', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('[data-qa="bottomLevelControls"]').textContent).toContain(
      'Google Image'
    );
    expect(compiled.querySelector('[data-qa="bottomLevelControls"]').textContent).toContain(
      'Explanation'
    );
    expect(compiled.querySelector('[data-qa="bottomLevelControls"]').textContent).toContain(
      'Dictionary'
    );
  });
});
