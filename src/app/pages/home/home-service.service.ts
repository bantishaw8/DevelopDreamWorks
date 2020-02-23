import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getUserProfileDetails(user) {
    return this.http
      .post<any>(`${environment.bffUrl}/userProfileDetails`, user, this.httpOptions)
      .pipe(
        map(results => {
          return results
        })
      )
  }

  getLandingPage() {
    return this.http
      .get<any>(`${environment.bffUrl}/getLandingPage`, this.httpOptions)
      .pipe(
        map(results => {
          return results;
        })
      );
  }
  getGoogleMapAdress(latLongObject) {
    return this.http
      .get<any>(`${environment.googleMapUrl}latlng=${latLongObject.latitude},${latLongObject.longitude}&key=${environment.APIKey}`)
      .pipe(
        map(results => {
          return results;
        })
      );
  }

  getGoogleAPILocation(location: string) {
    const googleAPI = `${environment.googleLocationSearch}query=${location}&key=${environment.APIKey}`
    const apiDetails = {
      url: googleAPI
    }
    return this.http
      .post<any>(`${environment.bffUrl}/getGooglePlaces`, apiDetails, this.httpOptions)
      .pipe(
        map(results => {
          return results;
        })
      );
  }

  saveGoogleAddress(googleGeneratedAddress) {
    return this.http
      .post<any>(`${environment.bffUrl}/saveGoogleAddress`, googleGeneratedAddress, this.httpOptions)
      .pipe(
        map(results => {
          return results;
        })
      );
  }
}
