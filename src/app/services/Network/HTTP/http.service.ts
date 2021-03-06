import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  STRINGS = {

    HTTP: {

      TEXT: 'text'

    }

  };

  constructor(private http: HttpClient) { }

  getKey(): Promise<string> {

    return this.http.get('http://localhost:3000').toPromise().then(res => res[this.STRINGS.HTTP.TEXT]);

  }

}
