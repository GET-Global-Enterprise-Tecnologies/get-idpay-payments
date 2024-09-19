import { CurrencyPipe } from "@angular/common";
import { Component, inject, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { ModalInformationComponent } from "../../../shared/components/modal-information/modal-information.component";

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

  readonly dialog = inject(MatDialog);

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
    this.dialog
      .open(ModalInformationComponent, {
        data: {
          title: "Guardar Datos",
          message: "¿Desea guardar los datos?",
          action: "Enviar",
        },
      })
      .afterClosed()
      .subscribe((result: string) => {
        if (result === "save") {
          this.finishProcess();
        }
      });
  }

  finishProcess() {
    this.dialog
      .open(ModalInformationComponent, {
        data: {
          title: "Proceso Finalizado",
          message: "El proceso ha finalizado correctamente",
          action: "Terminar",
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.clearData();
      });
  }
}
