import { Component, signal } from "@angular/core";
import { HeaderComponent } from "../../../shared/components/header/header.component";
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

  ngOnInit() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

  refreshData(data: unknown[]) {
    this.dataView.set(data);
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.viewData.set(true);
    }, 4000);
  }

  clearDataAction() {
    this.viewData.set(false);
  }
}
