import { Injectable } from '@angular/core';
import { HttpService } from './HTTP/http.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpService) { }

}
