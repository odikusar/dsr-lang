import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxCsvParserModule } from 'ngx-csv-parser';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';

@NgModule({
  declarations: [WorkspaceComponent],
  imports: [CommonModule, WorkspaceRoutingModule, NgxCsvParserModule],
})
export class WorkspaceModule {}
