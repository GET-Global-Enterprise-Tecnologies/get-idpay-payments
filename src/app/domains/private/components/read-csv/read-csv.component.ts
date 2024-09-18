import { Component, Output, signal } from "@angular/core";
import * as XLSX from "xlsx";

@Component({
  selector: "app-read-csv",
  standalone: true,
  imports: [],
  template: '<input type="file" (change)="onFileChange($event)" />',
  styleUrl: "./read-csv.component.scss",
})
export class ReadCsvComponent {
  dataExcel = signal<any>([]);
  dataResult = Output;

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      const workBook = XLSX.read(reader.result, { type: "binary" });
      console.log(workBook);
      const workSheetName = workBook.SheetNames;
      console.log(workSheetName);
      const workSheet = workBook.Sheets[workSheetName[0]];
      console.log(workSheet);
      const data = XLSX.utils.sheet_to_json(workSheet);
      this.dataExcel.set(data);
      console.log(this.dataExcel());
    };
    reader.readAsText(file);
  }
}
