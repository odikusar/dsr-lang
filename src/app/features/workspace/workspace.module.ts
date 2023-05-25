import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxCsvParserModule } from 'ngx-csv-parser';
import { WorkspaceCardComponent } from './/components/workspace-card/workspace-card.component';
import { WorkspaceFileComponent } from './components/workspace-files/components/workspace-file/workspace-file.component';
import { WorkspaceFilesComponent } from './components/workspace-files/workspace-files.component';
import { WorkspacePaginationComponent } from './components/workspace-pagination/workspace-pagination.component';
import { FileNamePipe } from './pipes/file-name.pipe';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceControlsComponent } from './components/workspace-controls/workspace-controls.component';

@NgModule({
  declarations: [
    WorkspaceComponent,
    WorkspaceFilesComponent,
    FileNamePipe,
    WorkspaceFileComponent,
    WorkspaceCardComponent,
    WorkspacePaginationComponent,
    WorkspaceControlsComponent,
  ],
  imports: [CommonModule, WorkspaceRoutingModule, NgxCsvParserModule],
})
export class WorkspaceModule {}
