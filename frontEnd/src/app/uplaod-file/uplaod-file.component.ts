import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Event } from '@angular/router';
@Component({
  selector: 'app-uplaod-file',
  templateUrl: './uplaod-file.component.html',
  styleUrls: ['./uplaod-file.component.css']
})
export class UplaodFileComponent implements OnInit {
  base64: string = "Base64...";
  fileSelected?: File;
  imageUrl?: string;

  constructor(private sant: DomSanitizer, private http: HttpClient) { }

  ngOnInit(): void {
  }

  /**
   * On Select New File
   * @param files 
   */
  onSelectNewFile(elemnt:HTMLInputElement): void {
    if(elemnt.files?.length==0)return;
    this.fileSelected = (elemnt.files as FileList)[0] ;
    this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
    this.base64 = "Base64...";
  }

  /**
   * Convert File To Base64
   */
  convertFileToBase64(): void {
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
    }
  }


  /**
   * Save Base64 
   */
  saveBase64File(): void {

    let body = {
      name: this.fileSelected?.name,
      base64: this.base64
    };

    this.http.post("http://localhost:4300/uplaodBase64", JSON.stringify(body), {
      headers: new HttpHeaders({ "content-type": "application/json" })
    }).subscribe(res => {
      window.open(`http://localhost:4300${res}`, "_blank")
    }, error => {
      alert("error");
      console.error(error);
    });
  }


  /**Save */
  saveFile() {
  let fmData=new FormData();
  fmData.append("file",this.fileSelected as any);

  this.http.post("http://localhost:4300/uplaodFile", fmData).subscribe(res => {
    window.open(`http://localhost:4300${res}`, "_blank")
  }, error => {
    alert("error");
    console.error(error);
  });
  }


}//End Class
