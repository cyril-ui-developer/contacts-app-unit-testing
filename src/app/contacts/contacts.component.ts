import { Component, OnInit } from '@angular/core';
import { ContactService } from '../app.service';

@Component({
  selector: 'app-contacts',
  templateUrl:"./contacts.component.html"
})
export class ContactsComponent implements OnInit {

  contacts: Array<any>;
  contactFlag: Boolean = false;

  constructor(public contactService: ContactService) { }

  ngOnInit() {
    this.getContactDetails();
    this.getContactsFun();
   // this.showContactDetail();
  }

  getContactsFun() {
    this.contactService.getContacts()
      .subscribe(data => {
        this.contacts = data;
      });
  }

  getContactDetails() {
  this.contactFlag = true;
  }

  showContactDetail() {
    this.contactFlag = true;
    }
}
