import { Component, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import * as XLSX from "xlsx";

@Component({
  selector: "app-read-csv",
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: "./read-csv.component.html",
  styleUrl: "./read-csv.component.scss",
})
export class ReadCsvComponent {
  dataResult = output<unknown[]>();
  uploadedFile: File | undefined;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.validateFile(file!);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files[0];
    this.validateFile(file!);
  }

  validateFile(file: File) {
    if (file && !file.name.endsWith(".csv")) {
      alert("Solo se aceptan archivos con formato .csv");
      return;
    }
    this.uploadedFile = file;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  viewFile() {
    const reader = new FileReader();
    reader.onload = () => {
      const workBook = XLSX.read(reader.result, { type: "binary" });
      const workSheetName = workBook.SheetNames;
      const workSheet = workBook.Sheets[workSheetName[0]];
      const data = XLSX.utils.sheet_to_json(workSheet);
      console.log(data);
      this.dataResult.emit(data);
    };
    reader.readAsText(this.uploadedFile as any);
  }
}
