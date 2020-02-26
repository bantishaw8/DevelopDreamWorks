import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    addAddress(address) {
      return this.http
        .post<any>(`${environment.bffUrl}/saveAddress`, address, this.httpOptions)
        .pipe(
          map(results => {
            return results
          })
        )
    }
  
    getAddresses(userId) {
      return this.http
        .get<any>(`${environment.bffUrl}/getAddress?userId`, this.httpOptions)
        .pipe(
          map(results => {
            return results;
          })
        );
    }
  
}

