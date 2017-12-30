import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  constructor(private http: Http){ }
  baseUrl = 'https://563ccacb97cf6a1100a17487.mockapi.io/contacts';

  getContacts() {
    console.log("serveice")
    return this.http.get(this.baseUrl)
      .map(res => res.json());
  }

}
