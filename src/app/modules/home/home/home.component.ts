import { Component, OnInit, OnDestroy } from '@angular/core';
import { IFileResourceNew } from 'src/app/models/Interfaces/IFIleResourceNew';
import { IFileResourceStatus } from 'src/app/models/Interfaces/IFileResourceStatus';
import { FileService } from 'src/app/shared/services/file.service';
import { interval, Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  newFile : IFileResourceNew[] = [];
  fileStatus : IFileResourceStatus;
  files: any[] = [];
  index: number = 0;
  private subscription: Subscription;
  intervalTimer = interval(environment.intervalTime);
  endStatus = "processed";
  failedStatus = "failed";
  
  constructor(private fileservice: FileService, private snackbar: SnackbarService) { }

  ngOnInit(): void {}

  onFileDropped($event) {
    this.prepareFilesList($event)
    .then(() => {
      if(!this.subscription || this.subscription.closed) this.checkStatus();
    });
  }

  prepareFilesList(files: Array<any>){
    return new Promise((resolve) =>{
      for(const item of files){
        let file = {
          name: item.name,
          status: "pending"
        };
        this.fileservice.postFile(item)
        .subscribe(
          (data: IFileResourceNew) => {
            this.newFile.push(data['data']);
            this.files.push(file);
          },
          error => {
            let msg= "";
            if(error.status === 409){
              msg = file.name + " already exists!";
            }
            else {
              msg = "User is not authorized to perform action for file: " + file.name + '.';
            }
            this.snackbar.failedMessage(msg);
        });
      }
    });
  }

  checkStatus(){
    this.subscription = this.intervalTimer
    .subscribe(
      () => {
        if(this.files.length === this.index ){
          this.endInterval();
        }
        else{
          const id = this.newFile[0].id;
          this.getFileStatus(id);
        }
      });
  }

  endInterval(){
    this.subscription.unsubscribe();
  }

  getFileStatus(id){
    this.fileservice.getFileStatus(id)
    .subscribe(
      (data: IFileResourceStatus)=> {
        this.files[this.index].status = data['data'].attributes.status;
        if(this.files[this.index].status === this.endStatus){
          this.index += 1;
          this.newFile.shift();
        } 
      },
      error => {
        let msg="";
        if(error.status === 400){
          msg = "Invalid file id for file: " + this.files[this.index].name + ". Please try again.";
        }
        else if(error.status === 403){
          msg = "User is not authorized to perform action for file: " + this.files[this.index].name + '.';
        }
        else{
          msg = "File is missing.";
        }
        this.index += 1;
        this.newFile.shift();
        this.files[this.index].status = this.failedStatus;
        this.snackbar.failedMessage(msg);
      });
  }

  ngOnDestroy(){
    if(this.subscription){
      this.endInterval();
    }
  }
}
