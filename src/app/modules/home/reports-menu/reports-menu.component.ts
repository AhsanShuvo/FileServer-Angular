import { Component, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { MatTableDataSource } from '@angular/material/table';

import { ReportService } from 'src/app/shared/services/reports.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { FilterComponent } from './filter/filter.component';
import { IReportList } from 'src/app/models/Interfaces/IReportList';
import { IRequestedReport } from 'src/app/models/Interfaces/IRequestedReport';
import { IReportSpec } from 'src/app/models/Interfaces/IReportSpec';

@Component({
  selector: 'app-reports-menu',
  templateUrl: './reports-menu.component.html',
  styleUrls: ['./reports-menu.component.scss']
})

export class ReportsMenuComponent implements OnInit {

  reportList: IReportList[] = [];
  requestedReports: IRequestedReport[] = [];
  filterReports: IReportSpec[] = [];
  columnElements = ['name', 'requestedTime', 'pdfView', 'pdfDownload', 'csvDownload', 'delete'];
  dataSource = new  MatTableDataSource(this.requestedReports);
  @ViewChild(FilterComponent) filterValues: FilterComponent;

  constructor(
    private reportservice: ReportService,
    private snackbar: SnackbarService,
  ){}

  ngOnInit(): void {
    this.initReports();
    this.initRequestedReport();
  }

  initRequestedReport(){
    this.reportservice.getRequestedReport()
    .subscribe((res) => {
      for(let item of res['data']){
        this.requestedReports.push(item);
      }
    },
    error => {},
    () => {
      this.updateMatTable();
    });
  }

  initReports(){
    this.reportservice.getReportList()
    .subscribe((res: IReportList[]) => {
      for(let item of res['data']){
        this.reportList.push(item);
      }
    },
    error => {
      this.snackbar.failedMessage("User is not authorised to perform this action.");
    });
  }

  getFilterReport(index){
    this.reportservice.getFilterReport(this.filterValues.form.value, this.reportList[index].attributes.url)
    .subscribe((res: IReportSpec[]) => {
      for(let item of res['data']){
        this.filterReports.push(item);
        let mapValue = this.mapper(item);
        this.requestedReports.push(mapValue); 
      }
    },
    error => {
      this.snackbar.failedMessage("Unknown problem. Please try again.");
    },
    () => {
      this.updateMatTable();
    });
  }

  viewPDF(id){
    this.reportservice.getPDF(id)
    .subscribe((res) => {
      let blob = new Blob([res as BlobPart], {type: 'application/pdf'});
      let pdf = URL.createObjectURL(blob);
      window.open(pdf);
    },
    error => {
      this.snackbar.failedMessage("Requested report not found.");
    });
  }

  downloadPDF(id){
    this.reportservice.getPDF(id)
    .subscribe((res) => {
      let blob = new Blob([res as BlobPart], {type: 'application/pdf'});
      let filename = this.getFileName(id);
      FileSaver.saveAs(blob, filename);
    },
    error => {
      this.snackbar.failedMessage("Requested report not found.");
    });
  }

  downloadCSV(id){
    this.reportservice.getCSV(id)
    .subscribe((response) => {
      let blob = new Blob([response as BlobPart], {type: 'text/csv;charset=utf-8;'});
      let filename = this.getFileName(id) + '.csv';
      FileSaver.saveAs(blob, filename);
    });
  }

  delete(item){
    this.reportservice.deleteReport(item.id)
    .subscribe(() => {
      this.requestedReports = this.requestedReports.filter( h => h.id !== item.id);
    },
    error => {
      let msg = "";
      if(error.status === 404 ) msg = "Requested report not found.";
      else msg = "Internal Problem. Please try again.";
      this.snackbar.failedMessage(msg);
    },
    () => {
      this.updateMatTable();
    });
  }

  mapper(item){
    let mapToRequestedReport = {
      id : item.id,
      type : item.type,
      attributes : {
        name : item.attributes.name,
        subtype: item.attributes.subtype,
        request_ts: item.attributes.requested_ts,
        filter: [
          {
            field_name: '',
            field_value: ''
          }
        ]
      }
    }
    return mapToRequestedReport; 
  }

  updateMatTable(){
    this.dataSource = new MatTableDataSource(this.requestedReports);
  }

  getFileName(id){
    let item = this.requestedReports.filter( x => x.id === id);
    let words = item[0].attributes.name.split(' ');
    let singleWord = '';
    for(let word of words){
      singleWord += word;
    }
    return singleWord;
  }
}
