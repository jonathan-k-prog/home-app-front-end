import {Component, Input} from '@angular/core';
import {Card} from 'primeng/card';
import {Dialog} from 'primeng/dialog';
import {Conversation} from '../../../../core/conversation/conversation.model';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'common-modal-loading',
  imports: [
    Dialog,
    ProgressSpinner
  ],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {
  protected visible = false;

  public show() {
    this.visible = true;
  }

  public close() {
    this.visible = false;
  }
}
