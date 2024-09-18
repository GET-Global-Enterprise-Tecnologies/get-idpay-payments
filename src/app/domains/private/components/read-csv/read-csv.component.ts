import { Component, output } from "@angular/core";
import * as XLSX from "xlsx";

@Component({
  selector: "app-read-csv",
  standalone: true,
  imports: [],
  template: '<input type="file" (change)="onFileChange($event)" />',
  styleUrl: "./read-csv.component.scss",
})
export class ReadCsvComponent {
  dataResult = output<unknown[]>();

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const workBook = XLSX.read(reader.result, { type: "binary" });
      const workSheetName = workBook.SheetNames;
      const workSheet = workBook.Sheets[workSheetName[0]];
      const data = XLSX.utils.sheet_to_json(workSheet);
      this.dataResult.emit(data);
    };
    reader.readAsText(file);
  }
}
