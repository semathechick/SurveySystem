import { Component } from '@angular/core';
import { Survey } from '../../../models/survey';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Answer } from '../../../models/answer';
import { Question } from '../../../models/question';
import { AnswerService } from '../../../services/answer.service';
import { QuestionService } from '../../../services/question.service';
import { SurveyService } from '../../../services/survey.service';


@Component({
  selector: 'app-admin-survey',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './admin-survey.component.html',
  styleUrl: './admin-survey.component.scss'
})
export class AdminSurveyComponent {
      surveyForm !: FormGroup;
      answerForm !: FormGroup;
      questionForm !: FormGroup;
      surveys: Survey[]=[];
      answers : Answer[]=[];
      questions: Question[]=[];
      constructor(private formBuilder:FormBuilder, private answerService :AnswerService, private questionService:QuestionService,private surveyService:SurveyService){}
  
      ngOnInit(): void {
        this.createSurveyAddForm();
        this.createQuestionForm();
       this.createAnswerForm();
       this.loadSurveys();
      }
  
      createSurveyAddForm(){
        this.surveyForm=this.formBuilder.group({
          surveyTitle: ['', Validators.required],
          question:["", Validators.required],
          option1: "",
          option2:"",
          option3:"",
         
          
        })
      }
      createSurveyForm(): void {
        this.surveyForm = this.formBuilder.group({
          surveyTitle: ['', Validators.required],
          // Add other fields as needed for survey creation
        });
      }
    
      createQuestionForm(): void {
        this.questionForm = this.formBuilder.group({
          surveyId: ['', Validators.required],
          indvQuestion: ['', Validators.required],
          // Add other fields as needed for question creation
        });
      }
    
      createAnswerForm(): void {
        this.answerForm = this.formBuilder.group({
          questionId: ['', Validators.required],
          userAnswer: ['', Validators.required],
          // Add other fields as needed for answer creation
        });
      }
    
      loadSurveys(): void {
        this.surveyService.getAllSurveys().subscribe({
          next: (surveys) => {
            this.surveys = surveys;
          },
          
        });
      }
    
      createSurvey(): void {
        if (this.surveyForm.valid) {
          const newSurvey: Survey = this.surveyForm.value;
          this.surveyService.addSurvey(newSurvey).subscribe({
            next: (response) => {
              console.log('Survey added successfully:', response);
              this.loadSurveys(); // Reload surveys after adding new one
            },
            error: (error) => {
              console.error('Error adding survey:', error);
              // Handle error adding survey
            }
          });
        }
      }
      
    
    
      addToDb(): void {
        if (this.surveyForm.valid) {
         
          const formData:Survey=this.surveyForm.value;
          console.log(formData.surveyTitle);
          
      
          this.surveyService.addSurvey(formData).subscribe({
            next: (surveyResponse) => {
              console.log('response', surveyResponse);
              alert(formData.surveyTitle.toUpperCase() +" başarıyla eklendi");
            },
            error: (surveyError) => {
              console.error('Error adding survey:', surveyError);
              alert('Anket eklenirken bir hata oluştu.');
            }
        });
        }
      }
  }

