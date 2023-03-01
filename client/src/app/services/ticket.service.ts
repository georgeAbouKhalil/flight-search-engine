import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TicketModel } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  public urls = environment.urls;

  constructor(private http: HttpClient) { }

  public async getAllDeparturePort(): Promise<TicketModel[]> {
    return this.http.get<TicketModel[]>(this.urls.departurePortUrl).toPromise();

  }
  public async getAllArrivalPort(): Promise<TicketModel[]> {
    return this.http.get<TicketModel[]>(this.urls.arrivalPortUrl).toPromise();

  }
  public async getAllPrices(departureP: any, arrivalP: any, date: any): Promise<TicketModel[]> {

    const pricess = this.http.get<TicketModel[]>(`${this.urls.pricesUrl}?departurePort=${departureP}&arrivalPort=${arrivalP}&departureDate=${date}`).toPromise();


    return pricess
  }


  public async getTicketFlight(ticketFlight: any) {
    console.log(ticketFlight);

    const abc = this.http.get<TicketModel[]>(`${this.urls.flightsUrl}?departurePort=${ticketFlight.departurePort}&arrivalPort=${ticketFlight.arrivalPort}&returnDate=${ticketFlight.returnDate}&departureDate=${ticketFlight.departureDate}`).toPromise();
    return abc
  }
}