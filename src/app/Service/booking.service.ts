import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingModel } from '../Model/BookingModel';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient) {
  }
  BookResource(booking:BookingModel)
  {
    return this.http.post('Booking/BookResource',booking);
  }
}
