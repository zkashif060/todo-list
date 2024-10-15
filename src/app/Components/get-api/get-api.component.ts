import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-get-api',
  standalone: true,
  imports: [CommonModule, ButtonModule, FileUploadModule, ToastModule, BadgeModule],
  templateUrl: './get-api.component.html',
  styleUrls: ['./get-api.component.css'],
  providers: [MessageService]
})
export class GetApiComponent {
  userList: any[] = [];
  files: any[] = [];
  totalSizePercent: number = 0;
  totalSize: number = 0;

  constructor(private http: HttpClient, private messageService: MessageService, private config: PrimeNGConfig) {}

  getAllUsers() {
    this.http.get<any>("https://jsonplaceholder.typicode.com/users").subscribe((result: any) => {
      this.userList = result;
    }, error => {
      console.log(error);
    });
  }

  choose(event: any, callback: () => void) {
    callback();
  }

  onSelectedFiles(event: any) {
    const files = event.files;
    this.messageService.add({ severity: 'info', summary: 'Files Selected', detail: `${files.length} files selected.` });
}

onTemplateUpload() {
    this.messageService.add({ severity: 'success', summary: 'Upload Complete', detail: 'Files have been uploaded successfully!' });
}

}