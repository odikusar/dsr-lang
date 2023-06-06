import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[dsrButtonClass]',
  standalone: true,
})
export class ButtonClassDirective {
  @HostBinding('class')
  elementClass = 'dsr-link-btn';
}
