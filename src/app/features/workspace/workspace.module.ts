import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { WorkspaceCardComponent } from './/components/workspace-card/workspace-card.component';
import { WorkspaceControlsComponent } from './components/workspace-controls/workspace-controls.component';
import { WorkspaceFileComponent } from './components/workspace-files/components/workspace-file/workspace-file.component';
import { WorkspaceFilesComponent } from './components/workspace-files/workspace-files.component';
import { WorkspacePaginationComponent } from './components/workspace-pagination/workspace-pagination.component';
import { FileNamePipe } from './pipes/file-name.pipe';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';

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
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    NgxCsvParserModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class WorkspaceModule {}
