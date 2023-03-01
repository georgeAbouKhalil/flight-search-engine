import { TicketService } from './../../services/ticket.service';
import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { TicketModel } from '../../models/ticket.model';
import {FormGroup, FormControl} from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class HomeComponent implements OnInit {

 
  public allDeparturePort: TicketModel[] | any[];
  public allArrivalPort: TicketModel[] | any[];
  
  flights: TicketModel[];
  flight: any;
  departureP: string;
  arrivalP: string;
  public ticketFlight = new TicketModel();


  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });


  constructor(private ticketService: TicketService,private renderer: Renderer2) {
  }

  

  async ngOnInit() {
    try {
      this.allDeparturePort = await this.ticketService.getAllDeparturePort();  
      this.allArrivalPort = await this.ticketService.getAllArrivalPort();
      this.allDeparturePort.sort((a, b) => a._id.departurePort.localeCompare(b._id.departurePort)) 
      this.allArrivalPort.sort((a, b) => a._id.arrivalPort.localeCompare(b._id.arrivalPort))

    }
    catch (err: any) {
      alert(err.message);
    }
  }

  arrivalF(event: any) {   
    const abc = (event.target as any).value;
    this.arrivalP = abc;
 }

 departureF(event: any) {
  const abc = (event.target as any).value;
  this.departureP = abc;
 }

  ngAfterViewInit() {
    this.displayMonth();
  }

  displayMonth() {   
  let elements = document.querySelectorAll('.endDate');
  let x = elements[0]?.querySelectorAll('.mat-calendar-body-cell');
  x?.forEach(async (y) => {
    const dateSearch = this.dateToString(new Date(y.getAttribute('aria-label')));
    
    this.flight = await this.ticketService.getAllPrices(this.departureP, this.arrivalP, dateSearch.toString() );
    if (this.flight.length >0) {
      y.innerHTML =
      '<div class="mat-calendar-body-cell-content mat-focus-indicator"><div class="row"><div class="col-12" style="">' +
      y.textContent +
      '</div><div class="col-12">' +
      this.flight[0]?.price +
      '</div></div></div>'; 
      }
    });
  }


  async streamOpened(event: any) {
    setTimeout(() => {
      let buttons = document.querySelectorAll('mat-calendar .mat-icon-button');
      buttons.forEach(btn =>
        btn.addEventListener('click', () => {setTimeout(() => {this.displayMonth() });})
      );
      this.displayMonth();
    });
  }

  dateToString(date: any) {
    return (
      ((date.getMonth() + 1))+
      '/' +
      (date.getDate())+
      '/' +
      date.getFullYear()+ ' 0:00'
    );
  }




  async onFormSubmit() {
    try {
      this.ticketFlight.departurePort = this.departureP;
      this.ticketFlight.arrivalPort = this.arrivalP;
      this.ticketFlight.departureDate = this.dateToString(this.range.value.start);
      this.ticketFlight.returnDate = this.dateToString(this.range.value.end);

     this.flights = await this.ticketService.getTicketFlight(this.ticketFlight);
     console.log(this.flights);
     
    }
    catch(err: any) {
      alert(err.message);
    }
  }
}






























// **********************GOOD*********
// dates = [
//   { date: '2022-12-01', price: 100 },
//   { date: '2022-12-02', price: 110 },
//   { date: '2022-12-03', price: 120 },
//   { date: '2022-12-14', price: 100 },
//   { date: '2022-12-05', price: 110 },
//   { date: '2022-12-06', price: 130 },
// ];
// dateClass = (d: Date) => {
//   const dateSearch = this.dateToString(d);
//   return this.dates.find((f) => f.date == dateSearch)
//     ? 'example-custom-date-class'
//     : undefined;
// };
// ngAfterViewInit() {
//   this.displayMonth();
// }
// // onSelectDate() {
// //   setTimeout(() => this.displayMonth(), 1000);
// // }

// displayMonth() {
//   let elements = document.querySelectorAll('.endDate');
//   let x = elements[0]?.querySelectorAll('.mat-calendar-body-cell');
//   x?.forEach((y) => {
//     const dateSearch = this.dateToString(
//       new Date(y.getAttribute('aria-label'))
//     );
//     const data = this.dates.find((f) => f.date == dateSearch);
//     if (data) {
//       // console.log(dateSearch);
//       y.innerHTML =
//       '<div class="mat-calendar-body-cell-content mat-focus-indicator"><div class="row"><div class="col-12" style="">' +
//       y.textContent +
//       '</div><div class="col-12">' +
//       data.price +
//       '</div></div></div>'; 
//     }
//   });
// }
// streamOpened(event: any) {
//   setTimeout(() => {
//     let buttons = document.querySelectorAll('mat-calendar .mat-icon-button');
//     buttons.forEach((btn) =>
//       this.renderer.listen(btn, 'click', () => {
//         setTimeout(() => {
//           this.displayMonth();
//         }        
//         );
//       })
//     );
//     this.displayMonth();
//   });
// }
// dateToString(date: any) {
//   return (
//     date.getFullYear() +
//     '-' +
//     ('0' + (date.getMonth() + 1)).slice(-2) +
//     '-' +
//     ('0' + date.getDate()).slice(-2)
    
//   );
// }

// }

























































// constructor(private renderer: Renderer2, private clipboard: Clipboard) {}
// dates = [
//   { date: '2022-12-01', price: 100 },
//   { date: '2022-12-02', price: 110 },
//   { date: '2022-12-03', price: 120 },
//   { date: '2022-12-14', price: 100 },
//   { date: '2022-12-05', price: 110 },
//   { date: '2022-12-06', price: 130 },
// ];
// dateClass = (d: Date) => {
//   const dateSearch = this.dateToString(d);
//   return this.dates.find((f) => f.date == dateSearch)
//     ? 'example-custom-date-class'
//     : undefined;
// };
// ngAfterViewInit() {
//   this.displayMonth();
// }

// displayMonth() {
//   let elements = document.querySelectorAll('.endDate');
//   console.log({elements});
  
//   let element = document.querySelector('.endDate');
//   console.log({element});
  
//   this.clipboard.copy(element.innerHTML);
//   console.log('clip ' ,this.clipboard);
//   console.log({element});
  
//   let x = elements[0]?.querySelectorAll<HTMLDivElement>(
//     '.mat-calendar .mat-calendar-body-cell-content'
//   );
//   x?.forEach((y) => {
//     y.innerText = y.innerText.length == 1 ? '0' + y.innerText : y.innerText;
//     const dateSearch = this.dateToString(
//       new Date(y.parentElement.getAttribute('aria-label'))
//     );
//     const data = this.dates.find((f) => f.date == dateSearch);
//     if (data) {
//       console.log(dateSearch);
//       y.innerHTML =
//         '<div class="row"><div class="col-12" style="font-size:1.5em;">' +
//         y.innerText +
//         '</div><div class="col-12">' +
//         data.price +
//         '</div></div>'; //TODO: check date and data
//       // y.setAttribute('aria-label', '' + data.price);
//     }
//   });
// }
// streamOpened(event:any) {
//   setTimeout(() => {
//     let buttons = document.querySelectorAll('mat-calendar .mat-icon-button');

//     buttons?.forEach((btn) =>
//       this.renderer.listen(btn, 'click', () => {
//         setTimeout(() => {
//           //debugger
//           this.displayMonth();
//         });
//       })
//     );
//     this.displayMonth();
//   });
// }
// dateToString(date: any) {
//   return (
//     date.getFullYear() +
//     '-' +
//     ('0' + (date.getMonth() + 1)).slice(-2) +
//     '-' +
//     ('0' + date.getDate()).slice(-2)
//   );
// }
// }