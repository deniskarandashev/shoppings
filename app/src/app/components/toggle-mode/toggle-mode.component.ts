import { StateService } from './../../state/state.service';
import { Component, inject } from '@angular/core';
import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-mode',
  standalone: true,
  imports: [MatButtonToggleModule, MatIcon],
  templateUrl: './toggle-mode.component.html',
  styleUrl: './toggle-mode.component.scss'
})
export class ToggleModeComponent {
  private state = inject(StateService);

  onChange(e: MatButtonToggleChange) {
    this.state.onChangeMode.next(e.value);
  }
}
