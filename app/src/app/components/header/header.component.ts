import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {StateService} from '../../state/state.service';
import {EncriptionUtils} from '../../utils/encription.utils';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationComponent} from '../notification/notification.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NotificationComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  state = inject(StateService);
  private _cdr = inject(ChangeDetectorRef);
  private _snackBar = inject(MatSnackBar);

  onAddBtnClick() {
    const isAddNewMode = this.state.isAddNewMode();
    this.state.isAddNewMode.set(!isAddNewMode)
    this._cdr.detectChanges();
  }

  copyPath() {
    const selectedStr = JSON.stringify(Array.from(this.state.selected()));
    const urlSafeData = EncriptionUtils.encryptedData(selectedStr)
    const url = `${window.location.origin}/shoppings?data=${urlSafeData}`;
    navigator.clipboard.writeText(url).then(() => {
      console.log('Ссылка скопирована в буфер обмена!');
    }).catch(err => {
      console.error('Не удалось скопировать ссылку: ', err);
    });

    this._snackBar.openFromComponent(NotificationComponent, {
      duration: 2000,
    });
  }
}
