import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private baseApiUrl = `${environment.apiUrl}/api/`;
  private headers = new HttpHeaders();
  constructor(private httpClient: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Access-Control-Allow-Origin', environment.baseUrl);
  }

  public getAll<T>(url: string) {
    return this.httpClient
      .get<T>(`${this.baseApiUrl}${url}`, {headers:this.headers});
  }
  public get<T>(url: string, query: any) {
    return this.httpClient
      .get<T>(`${this.baseApiUrl}${url}${query}`, {headers:this.headers});
  }
  public post<T>(url: string, item: any): Observable<any> {
    return this.httpClient
      .post<T>(`${this.baseApiUrl}${url}`, JSON.stringify(item), {headers:this.headers});
  }
  public postFormData(url: string, formData: FormData): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', environment.baseUrl);
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      headers = headers.set('Authorization', `Bearer ${user.token}`);
    }
    return this.httpClient
      .post(`${this.baseApiUrl}${url}`, formData, {headers:headers});
  }
  public update(url: string, item: any) {
    return this.httpClient
      .put<any>(`${this.baseApiUrl}${url}`, item.json(), {headers:this.headers})
      .pipe(map(data => data.json()));
  }
  public delete(url: string, id: number) {
    return this.httpClient
      .delete(`${this.baseApiUrl}${url}${id}`, {headers:this.headers});
  }


}
