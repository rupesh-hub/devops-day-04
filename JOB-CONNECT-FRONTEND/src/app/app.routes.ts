import {Routes} from '@angular/router';
import {ListJobComponent} from "./job/list-job/list-job.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ListJobComponent},
  {path: '**', redirectTo: 'home'}
];
