import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(private httpClient:HttpClient) { }
  apiUrl:string = "http://localhost:60805/api/Surveys";
  

  getAllSurveys(): Observable<Survey[]> {
    return this.httpClient.get<Survey[]>(this.apiUrl);
  }

  addSurvey(survey: Survey): Observable<Survey> {
    return this.httpClient.post<Survey>(this.apiUrl, survey);
  }
}
