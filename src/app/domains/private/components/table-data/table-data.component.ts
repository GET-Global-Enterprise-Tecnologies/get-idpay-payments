import { CurrencyPipe } from "@angular/common";
import { Component, input } from "@angular/core";
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
  imports: [CurrencyPipe, MatTableModule],
  templateUrl: "./table-data.component.html",
  styleUrl: "./table-data.component.scss",
})
export class TableDataComponent {
  dataView = input<unknown[]>([]);
  displayedColumns: string[] = [];
  dataSource!: PeriodicElement[];

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    this.dataSource = this.dataView() as PeriodicElement[];
    this.displayedColumns = Object.keys(this.dataSource[0]);
  }
}
