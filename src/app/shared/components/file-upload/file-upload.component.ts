import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
  @Input() itemId!: any;
  file!: File;
  private formData = new FormData();
  private apiUrl = environment.API_URL;
  @Output() private setImage = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  onFilechange(event: any) {
    this.file = event.target.files[0]
  }

  upload() {
    let formParams = new FormData();
    formParams.append('image', this.file)
    console.log(formParams)
    this.itemId.image = formParams
    //this.setImage.emit(formParams);
    this.http.put(`${this.apiUrl}/recipes/${this.itemId.id}`, this.itemId).subscribe((response) => {
      console.log(response)
    });
  }

}
