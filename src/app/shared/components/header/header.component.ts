import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemeService } from '@app/services/theme.service';
import { User } from '@models/user.model';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ButtonClassDirective } from '@shared/directives/button-class.directive';

@Component({
  selector: 'dsr-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    RouterModule,
    ButtonClassDirective,
  ],
})
export class HeaderComponent {
  @Input() user: User;
  @Input() isAuthorized: boolean;
  @Output() signOut = new EventEmitter<void>();

  constructor(private themeService: ThemeService) {}

  isDarkTheme$ = this.themeService.isDarkTheme$;

  onSignOut(): void {
    this.signOut.emit();
  }

  toggleTheme(event: MatSlideToggleChange): void {
    this.themeService.toggleTheme();
  }
}
