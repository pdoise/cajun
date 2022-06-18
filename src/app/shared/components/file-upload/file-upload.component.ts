import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
  @Input() itemId!: any;
  file!: File;
  @Output() private setImage = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

  }

  onFilechange(event: any) {
    this.file = event.target.files[0]
  }

  upload() {
    let formParams = new FormData();
    formParams.append(this.file.name, this.file)
    console.log(this.file)
    this.setImage.emit(formParams);
  }

}
