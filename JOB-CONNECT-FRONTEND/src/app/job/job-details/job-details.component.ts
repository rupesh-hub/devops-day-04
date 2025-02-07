import {Component} from '@angular/core';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {JobResponse} from "../list-job/model/job-model";
import {JobService} from "../job-service.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {

  job: JobResponse | null = null;
  private id: string = '';

  constructor(private route: ActivatedRoute, private _jobService: JobService) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
    });

    this._jobService.getJobById(this.id)
      .subscribe({
        next: (response) => {
          this.job = response;
        },
        error: (error) => {
          console.error('Error getting job:', error);
        }
      })

  }


}
