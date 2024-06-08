import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-saiba-mais-video',
  templateUrl: './modal-saiba-mais-video.component.html',
  styleUrls: ['./modal-saiba-mais-video.component.css']
})
export class ModalSaibaMaisVideoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalSaibaMaisVideoComponent >,
  ) { }

  closeModal(): void {
    this.dialogRef.close();
  }
}
