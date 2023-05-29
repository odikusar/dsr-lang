import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ROWS_PER_PAGE } from '@app/constants';

@Component({
  selector: 'dsr-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AboutComponent {
  ROWS_PER_PAGE = ROWS_PER_PAGE;
}
