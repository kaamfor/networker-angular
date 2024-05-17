import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() isTopNav?: boolean = undefined;
  @Input() isLoggedIn?: boolean = undefined;
  @Output() onSidenavClicked: EventEmitter<boolean> = new EventEmitter();

  sidenavClicked() {
    this.onSidenavClicked.emit(true);
  }
}
