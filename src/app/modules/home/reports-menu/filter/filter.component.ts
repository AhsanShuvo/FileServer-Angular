import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';

import { IReportFilterList } from 'src/app/models/Interfaces/IReportFilterList';
import { ReportService } from 'src/app/shared/services/reports.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  form : FormGroup ;
  isMultiSelected: boolean[] = [];
  reportsFilter: IReportFilterList[] = [];
  loadingIndicator: boolean = true;

  constructor(
    private fb: FormBuilder,
    private reportservice: ReportService,
    private snackbar: SnackbarService
  ){}

  ngOnInit(): void {
    this.form=this.fb.group({
      prospect : [''],
      property_num : [''],
      property_name: [''],
      state : [''],
      field : [''],
      operator: [''],
      startDate:[''],
      endDate: ['']
    });
    this.getFilterType();
  }

  getFilterType(){
    this.reportservice.getReportFilter()
    .subscribe((res: IReportFilterList[]) => {
      for(let item of res['data']){
        if(item.attributes.filter_type === 'date')continue;
        let flag = item.attributes.filter_type === 'multiSelect' ? true : false;
        this.isMultiSelected.push(flag);
        this.reportsFilter.push(item);
      }
    },
    error => {
      this.snackbar.failedMessage("User is not authorised to access this page.");
    },
    () => {
      this.loadingIndicator = false;
    });
  }

  reset(){
    this.form.reset();
  }
}
