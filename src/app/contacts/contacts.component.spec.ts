
import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ContactsComponent } from './contacts.component';
import { ContactService } from '../app.service';
import { ContactModel } from './contact.model';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

//https://www.packtpub.com/books/content/testing-components-service-dependencies

const mockData = [
  { "id": "1", "createdAt": 1513929340, "name": "name 1", "email": "email 1" }
];

const MockContactService = {
  getContacts() {
      console.log("mock serveice")
    return Observable.create((observer: Observer<Array<ContactModel>>) => {
      observer.next(mockData);
    });


  }
};

let fixture: ComponentFixture<ContactsComponent>;
let component: ContactsComponent;
let element: HTMLElement;
let contactService;
let btn: DebugElement;

describe('Component: Contacts', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ContactsComponent],
      providers: [
        { provide: ContactService, useValue: MockContactService }
      ]
    }).compileComponents();

    TestBed.compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ContactsComponent);
        component = fixture.debugElement.componentInstance;
       // component = fixture.componentInstance;
        element = fixture.debugElement.nativeElement;
        contactService = fixture.debugElement.injector.get(ContactService);
      });

  }));


  describe('getContacts', () => {
    it('should make a call to contactService.getContacts()', () => {
     //spyOn(component, 'getContacts').and.callThrough();
      spyOn(contactService, 'getContacts').and.returnValue(Observable.of({}));
 //fixture.detectChanges();
      contactService.getContacts();

      expect(contactService.getContacts).toHaveBeenCalled();
    });

    it('should set the contacts property after fetching data', async(() => {
    //component.getContacts();
    spyOn(component.contactService, 'getContacts').and.returnValue(Observable.of(mockData));

   component.getContactsFun();
 fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.contacts).toEqual(mockData);
      });
    }));

    it('sets initial data (using async)', async(() => {
      // Arrange: spy on api.getCourses to return Promise.resolve({mockCourses})

      // Act: trigger ngOnInit through fixture.detectChanges()
      fixture.detectChanges();
      component.getContactsFun();
      // Assert: use the fixture's whenStable() method
      // to assert that component.courses is equal to mockCourses
      fixture.whenStable()
        .then(() => {
          expect(component.contacts).toEqual(mockData);
          expect(component.contacts.length).toEqual(mockData.length);
          expect(component.contacts[0].name).toBe('name 1');
        });
    }));
describe("testing component methods", () => {

  it("should test component methods", () => {
    spyOn(component, 'getContactDetails');
  fixture.detectChanges();
  expect(component.getContactDetails).toHaveBeenCalled();
  });

  it("should test component methods", async(() => {
    spyOn(component, 'showContactDetail');
   const btn = fixture.debugElement.nativeElement.querySelector('button');
    btn.click();

    //fixture.detectChanges();
    fixture.whenStable().then(() => {
    expect(component.showContactDetail).toHaveBeenCalled();
    });
  }));

  //Here I am testing a method that is invoked by the click event.
  it('should 1', fakeAsync( () => {
      fixture.detectChanges();
      spyOn(component, 'showContactDetail'); //method attached to the click.
      btn = fixture.debugElement.query(By.css('button'));
      btn.triggerEventHandler('click', null);
      tick(); // simulates the passage of time until all pending asynchronous activities finish

      fixture.detectChanges();
      expect(component.showContactDetail).toHaveBeenCalled();
  }));

  it('should 2', fakeAsync( () => {
    // fixture.detectChanges();
    spyOn(component, 'showContactDetail'); //method attached to the click.
    const btns = fixture.debugElement.queryAll(By.css('button'))[0];
    // fixture.debugElement.queryAll(By.css('button'))[0];
    btns.triggerEventHandler('click', null);
    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();
    //component.showContactDetail();
    expect(component.showContactDetail).toHaveBeenCalled();
    expect(component.contactFlag).toBe(true);
}));
});



    it('should not invoke service method before OnInit', () => {
      const spy =  spyOn(component, 'getContactsFun').and.callThrough();
       expect(spy.calls.any()).toBe(false, "service methods not yet called");
     });

     //Returns true if any calls have been made - obj.method.calls.any();
    it('should invoke service method after component initialized', () => {

      const spy = spyOn(component, 'getContactsFun').and.callThrough();
      fixture.detectChanges();
      expect(spy.calls.any()).toBe(true, "service methods called");
    });
  });
});









