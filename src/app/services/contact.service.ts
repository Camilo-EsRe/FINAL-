import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contact } from '../models/contact.model';
import { AuthService } from './auth.service'; // Importar AuthService para obtener el token

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': token || '' // Envía el token en el header
    });
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`<span class="math-inline">\{this\.baseUrl\}/</span>{id}`, { headers: this.getHeaders() });
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.baseUrl, contact, { headers: this.getHeaders() });
  }

  updateContact(id: string, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`<span class="math-inline">\{this\.baseUrl\}/</span>{id}`, contact, { headers: this.getHeaders() });
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete<any>(`<span class="math-inline">\{this\.baseUrl\}/</span>{id}`, { headers: this.getHeaders() });
  }
}