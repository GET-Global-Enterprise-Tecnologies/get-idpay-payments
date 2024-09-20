import { DatePipe, registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
import { Component, inject, signal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { ModalInformationComponent } from "../../../shared/components/modal-information/modal-information.component";
import { ModalInformation } from "../../../shared/models/modal.interface";
import { Table } from "../../../shared/models/table.interface";
import { ReadCsvComponent } from "../../components/read-csv/read-csv.component";
import { TableDataComponent } from "../../components/table-data/table-data.component";
import { LoaderComponent } from "../loader/loader.component";
registerLocaleData(localeEs, "es-ES");

@Component({
  selector: "app-analyze-data",
  standalone: true,
  imports: [ReadCsvComponent, LoaderComponent, TableDataComponent, HeaderComponent],
  templateUrl: "./analyze-data.component.html",
  styleUrl: "./analyze-data.component.scss",
  providers: [DatePipe],
})
export class AnalyzeDataComponent {
  isLoading = signal<boolean>(false);
  viewData = signal<boolean>(false);
  dataView = signal<unknown[]>([]);

  readonly dialog = inject(MatDialog);
  private datePipe = inject(DatePipe);

  ngOnInit() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

  refreshData(data: unknown[]) {
    const dataFormatted = this.formatDate(data as Table[]);
    this.validateData(dataFormatted);
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 4000);
  }

  formatDate(data: Table[]) {
    return data.map((item) => {
      const date = item.effectiveDate.split("/");
      const newDate = new Date(`${date[2]}-${date[1]}-${date[0]}`).toISOString();

      const options: Intl.NumberFormatOptions = {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      };

      item.totalTransactionValue = new Intl.NumberFormat("es-CO", options).format(
        Number(item.totalTransactionValue)
      );

      item.effectiveDate = this.datePipe.transform(
        newDate,
        "fullDate",
        "+0430",
        "es-ES"
      ) as string;
      return item;
    });
  }

  validateData(data: Table[]) {
    if (data.length === 0) {
      this.modalInformation({
        title: "Error",
        message: "No se encontraron datos en el archivo",
        action: "Aceptar",
      });
      return;
    }

    const invalidData3 = data.filter((item) => {
      return item.totalTransactionValue === 0;
    });

    if (invalidData3.length > 0) {
      this.modalInformation({
        title: "Error",
        message: "El monto no puede ser 0",
        action: "Aceptar",
      });
      return;
    }

    this.dataView.set(data);
    this.viewData.set(true);
  }

  modalInformation(body: ModalInformation) {
    return this.dialog.open(ModalInformationComponent, {
      data: body,
    });
  }

  clearDataAction() {
    this.viewData.set(false);
  }
}
