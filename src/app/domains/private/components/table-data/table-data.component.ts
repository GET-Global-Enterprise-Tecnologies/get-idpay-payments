import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component, inject, input, output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { ModalInformationComponent } from "../../../shared/components/modal-information/modal-information.component";
import { Table } from "../../../shared/models/table.interface";

@Component({
  selector: "app-table-data",
  standalone: true,
  imports: [
    CurrencyPipe,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: "./table-data.component.html",
  styleUrl: "./table-data.component.scss",
})
export class TableDataComponent {
  dataView = input<unknown[]>([]);
  clearDataAction = output();
  displayedColumns: string[] = [];
  dataSource!: Table[];
  editMode = false;

  readonly dialog = inject(MatDialog);
  private datePipe = inject(DatePipe);

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    this.dataSource = this.dataView() as Table[];
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

  changeDate(event: Event, element: any) {
    this.dataSource = this.dataSource.map((data) => {
      if (data.processId === element.processId) {
        return {
          ...data,
          effectiveDate: this.datePipe.transform(
            element.effectiveDate,
            "fullDate",
            "+0430",
            "es-ES"
          ) as string,
        };
      }
      return data;
    });
  }

  changeId(event: Event, element: any) {
    console.log(event, element);
  }

  changeNit(event: Event, element: any) {
    console.log(event, element);
  }

  changeName(event: Event, element: any) {
    console.log(event, element);
  }

  changeAccount(event: Event, element: any) {
    console.log(event, element);
  }

  changeIdentification(event: Event, element: any) {
    console.log(event, element);
  }

  changeTransaction(event: Event, element: any) {
    console.log(event, element);
  }

  changeValue(event: Event, element: any) {
    const options: Intl.NumberFormatOptions = {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
    this.dataSource = this.dataSource.map((data) => {
      if (data.processId === element.processId) {
        return {
          ...data,
          totalTransactionValue: new Intl.NumberFormat("es-CO", options).format(
            Number(element.totalTransactionValue)
          ),
        };
      }
      return data;
    });
  }

  changeNameFile(event: Event, element: any) {
    console.log(event, element);
  }

  changeDescription(event: Event, element: any) {
    console.log(event, element);
  }
}
