import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {StateService} from '../../state/state.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  state = inject(StateService);
  private _cdr = inject(ChangeDetectorRef);

  onAddBtnClick() {
    const isAddNewMode = this.state.isAddNewMode();
    this.state.isAddNewMode.set(!isAddNewMode)
    this._cdr.detectChanges();
  }
}
