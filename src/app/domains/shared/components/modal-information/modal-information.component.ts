import { Component, inject, model } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { ModalInformation } from "../../models/modal.interface";

@Component({
  selector: "app-modal-information",
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: "./modal-information.component.html",
  styleUrl: "./modal-information.component.scss",
})
export class ModalInformationComponent {
  readonly dialogRef = inject(MatDialogRef<ModalInformationComponent>);
  readonly data = inject<ModalInformation>(MAT_DIALOG_DATA);
  readonly informationModal = model(this.data);

  onNoClick(): void {
    this.dialogRef.close("save");
  }

  clearData() {
    this.dialogRef.close("clear");
  }
}
