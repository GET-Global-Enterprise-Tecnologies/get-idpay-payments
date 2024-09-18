import { CurrencyPipe } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";

export interface PeriodicElement {
  process: number;
  nit: number;
  id: number;
  date: string;
  type: number;
  mount: number;
  newDate: string;
  token?: string;
  confim: number | string;
  sigla: string;
  desc: string;
}

@Component({
  selector: "app-table-data",
  standalone: true,
  imports: [CurrencyPipe, MatTableModule, MatButtonModule],
  templateUrl: "./table-data.component.html",
  styleUrl: "./table-data.component.scss",
})
export class TableDataComponent {
  dataView = input<unknown[]>([]);
  clearDataAction = output();
  displayedColumns: string[] = [];
  dataSource!: PeriodicElement[];

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    this.dataSource = this.dataView() as PeriodicElement[];
    this.displayedColumns = Object.keys(this.dataSource[0]);
  }

  clearData() {
    this.dataSource = [];
    this.displayedColumns = [];
    this.clearDataAction.emit();
  }

  saveData() {
    console.log("Save data");
  }
}
