import {Component, EventEmitter, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {Home} from '../../../../../core/home/home.model';

@Component({
  selector: 'common-modal-delete-home',
  imports: [
    Button,
    Dialog
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class CommonModalDeleteHomeComponent {
  @Output() onSubmit: EventEmitter<Home> = new EventEmitter();

  protected home: Home | null = null;
  protected visible: boolean = false;

  public showModal(home: Home) {
    this.home = home;
    this.visible = true;
  }

  protected confirm() {
    if (!this.home) {
      return;
    }

    this.onSubmit.emit(this.home);
    this.cancel();
  }

  protected cancel() {
    this.home = null;
    this.visible = false;
  }
}
