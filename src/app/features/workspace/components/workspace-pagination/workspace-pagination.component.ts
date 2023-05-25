import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsr-workspace-pagination',
  templateUrl: './workspace-pagination.component.html',
  styleUrls: ['./workspace-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspacePaginationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
