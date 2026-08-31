import {Component, EventEmitter, input, Input, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {PrimeTemplate} from 'primeng/api';
import {Skeleton} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';
import {Home} from '../../../../../core/home/home.model';
import {Weather} from '../../../../../core/weather/weather.model';

@Component({
  selector: 'common-modal-select-home',
  imports: [
    Button,
    Dialog,
    PrimeTemplate,
    Skeleton,
    TableModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class CommonModalSelectHomeComponent {
  public homes = input<Home[]>([]);
  public loadingHomes = input<boolean>(false);

  @Output() onSubmit: EventEmitter<Home> = new EventEmitter();

  protected visible: boolean = false;

  public showModal() {
    this.visible = true;
  }

  protected select(home: Home) {
    this.onSubmit.emit(home);
    this.visible = false;
  }

  protected cancel() {
    this.visible = false;
  }
}
