import { Routes } from '@angular/router';
import { HomepageComponent } from './admin/layout/components/homepage/homepage.component';
import { SurveyComponent } from './ui/components/survey/survey.component';
import { AdminSurveyComponent } from './admin/components/admin-survey/admin-survey.component';


export const routes: Routes = [
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    { path: 'homepage', component: HomepageComponent},
    { path: 'admin/survey', component: AdminSurveyComponent},
    {path: 'survey', component: SurveyComponent}
];
