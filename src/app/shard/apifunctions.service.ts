import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApifunctionsService {

  constructor(private http: HttpClient) {}

    getpost(){

      return this.http.get("https://task.astra-tech.net/fronendtask/public/api/getposts");
    }

    private apiUrl = 'https://task.astra-tech.net/fronendtask/public/api';

    addPost(postData: FormData) {
    return this.http.post(`${this.apiUrl}/create`, postData);
  }

    deletepost(id:any){

      return this.http.post("https://task.astra-tech.net/fronendtask/public/api/deletepost", id);
    }

    updatepost(id:any){

      return this.http.post("https://task.astra-tech.net/fronendtask/public/api/updatepost", id);
    }
   }

