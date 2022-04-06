import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, OperatorFunction, pluck, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagePreviewService {
  private apiEndpoint = 'https://api.peekalink.io/';
  private apiCheckEndpoint = 'https://api.peekalink.io/is-available/';
  private apiKey = '67e463cd-8bf1-4131-aaaf-8bf6bb09f411';

  constructor(private http: HttpClient) {}
  getPagePreviewJSON(url: string) {
    return this.http.post(
      this.apiEndpoint,
      {
        link: url,
      },
      {
        headers: new HttpHeaders({
          'X-API-Key': this.apiKey,
        }),
      }
    );
  }
  checkEndpoint(endpoint: string): Observable<boolean> {
    return this.http
      .post(
        this.apiCheckEndpoint,
        {
          link: endpoint,
        },
        {
          headers: new HttpHeaders({
            'X-API-Key': this.apiKey,
          }),
        }
      )
      .pipe(<OperatorFunction<Object, boolean>>pluck('isAvailable'));
  }
}
