import { Component, inject, signal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { ModalInformationComponent } from "../../../shared/components/modal-information/modal-information.component";
import { ModalInformation } from "../../../shared/models/modal.interface";
import { Table } from "../../../shared/models/table.interface";
import { ReadCsvComponent } from "../../components/read-csv/read-csv.component";
import { TableDataComponent } from "../../components/table-data/table-data.component";
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: "app-analyze-data",
  standalone: true,
  imports: [ReadCsvComponent, LoaderComponent, TableDataComponent, HeaderComponent],
  templateUrl: "./analyze-data.component.html",
  styleUrl: "./analyze-data.component.scss",
})
export class AnalyzeDataComponent {
  isLoading = signal<boolean>(false);
  viewData = signal<boolean>(false);
  dataView = signal<unknown[]>([]);

  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

  refreshData(data: unknown[]) {
    this.validateData(data as Table[]);
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 4000);
  }

  validateData(data: Table[]) {
    debugger;
    if (data.length === 0) {
      this.modalInformation({
        title: "Error",
        message: "No se encontraron datos en el archivo",
        action: "Cerrar",
      });
      return;
    }

    const keys = Object.keys(data[0] as object);
    if (keys.length > 11) {
      // alert("El archivo debe contener 11 columnas");
      this.modalInformation({
        title: "Error",
        message: "El archivo debe contener 11 columnas",
        action: "Cerrar",
      });
      return;
    }

    const requiredKeys = [
      "process",
      "nit",
      "id",
      "date",
      "type",
      "mount",
      "newDate",
      "confim",
      "sigla",
      "desc",
    ];
    const missingKeys = requiredKeys.filter((key) => !keys.includes(key));
    if (missingKeys.length > 0) {
      this.modalInformation({
        title: "Error",
        message: `Faltan las siguientes columnas: ${missingKeys.join(", ")}`,
        action: "Cerrar",
      });
      return;
    }

    const invalidData = data.filter((item) => {
      return Object.values(item).some((value) => {
        return value === null || value === undefined || value === "";
      });
    });

    if (invalidData.length > 0) {
      this.modalInformation({
        title: "Error",
        message: "Los datos no pueden estar vacíos",
        action: "Cerrar",
      });
      return;
    }

    const invalidTypes = data.filter((item) => {
      return Object.values(item).some((value) => {
        return typeof value !== "number" && typeof value !== "string";
      });
    });

    if (invalidTypes.length > 0) {
      this.modalInformation({
        title: "Error",
        message: "Los datos deben ser de tipo string o number",
        action: "Cerrar",
      });
      return;
    }
    let id = 0;
    const invalidMount = data.filter((item) => {
      id++;
      return item.mount > 0;
    });

    if (invalidMount.length > 0) {
      this.modalInformation({
        title: "Error",
        message: "El monto no puede ser positivo en la fila " + id,
        action: "Cerrar",
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
