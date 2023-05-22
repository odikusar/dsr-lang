import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemeService } from '@app/services/theme.service';
import { User } from '@models/user.model';

@Component({
  selector: 'dsr-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
