import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
  @Input() itemId!: any;
  file!: File;
  private formData = new FormData();
  @Output() private setImage = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

  }

  onFilechange(event: any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
      this.formData.append('image', this.file, this.file.name);
    }
  }

  upload() {
    this.setImage.emit(this.formData);
  }

}
