import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private httpClient:HttpClient) { }
  private apiUrl:string = "http://localhost:60805/api/Questions";

  addQuestion(question:Question):Observable<Question>{
    const token = localStorage.getItem('Token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<Question>(this.apiUrl,question,{headers:headers})
  }
  getQuestionsBySurveyId(surveyId: string): Observable<Question[]> {
    const url = `${this.apiUrl}/GetBySurveyId/${surveyId}`;
    return this.httpClient.get<Question[]>(url);
  }

}
