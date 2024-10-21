import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, startWith, map } from 'rxjs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl(0);
  @Input() options: string[] = ['1', '2', '3'];
  @Input() width: string = '4rem';
  @Input() set defaultValue(value: string) {
    if (this.myControl) {
      const valueNum = parseFloat(value)
      if (!isNaN(valueNum)) {
        this.myControl.patchValue(valueNum ?? 0)
      } else {
        this.myControl.patchValue(0)
      }
      
    }
  }
  @Output() value = new EventEmitter<string>()
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || 0)),
    // );


    this.myControl.valueChanges.subscribe(value => {
        this.value.next(value?.toString() ?? '0')
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}