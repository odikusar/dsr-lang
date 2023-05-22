import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, MatSlideToggleModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class LayoutModule {}
