import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.APIURL;
  private apiKey = environment.APIKEY;

  constructor(private http: HttpClient) { }

  completePrompt(prompt: string): Observable<any> {
    const endpoint = `${this.apiUrl}/completions`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    };

    const data = {
      "model": "text-davinci-003",
      "prompt": prompt,
      "temperature": 0.7,
      "max_tokens": 400,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0
    };

    return this.http.post(endpoint, data, { headers: headers });
  }
}
