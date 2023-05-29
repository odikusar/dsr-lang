import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pipe, PipeTransform } from '@angular/core';
import { FileNamePipe } from '@features/workspace/pipes/file-name.pipe';
import { MemoFile } from '@models/memo-file.model';
import { WorkspaceFileComponent } from './workspace-file.component';

@Pipe({ name: 'fileName' })
class MockPipe implements PipeTransform {
  public transform(memoFile: MemoFile) {
    return '';
  }
}

describe('WorkspaceFileComponent', () => {
  let component: WorkspaceFileComponent;
  let fixture: ComponentFixture<WorkspaceFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspaceFileComponent, MockPipe],
      providers: [{ provide: FileNamePipe, useClass: MockPipe }],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
