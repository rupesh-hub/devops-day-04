import { Component } from '@angular/core';
import {GlobalResponse, JobResponse} from "./model/job-model";
import {JobService} from "../job-service.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-list-job',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-job.component.html',
  styleUrl: './list-job.component.scss'
})
export class ListJobComponent {

  jobs: JobResponse[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;
    this.error = null;

    this.jobService.allJobs().subscribe({
      next: (response: GlobalResponse<JobResponse[]>) => {
        if (response.success && response.data) {
          this.jobs = response.data;
        } else {
          this.error = response.message || 'Failed to load jobs';
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load jobs. Please try again later.';
        this.loading = false;
        console.error('Error loading jobs:', error);
      }
    });
  }

  editJob(job: JobResponse): void {
    // Implement navigation to edit page or open edit modal
    console.log('Edit job:', job);
  }

  toggleJobStatus(job: JobResponse): void {
    if (job.enabled) {
      this.jobService.disableJob(job.id).subscribe({
        next: (response) => {
          if (response.success) {
            job.enabled = false;
          }
        },
        error: (error) => console.error('Error disabling job:', error)
      });
    } else {
      this.jobService.enableJob(job.id).subscribe({
        next: (response) => {
          if (response.success) {
            job.enabled = true;
          }
        },
        error: (error) => console.error('Error enabling job:', error)
      });
    }
  }

  deleteJob(job: JobResponse): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(job.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.jobs = this.jobs.filter(j => j.id !== job.id);
          }
        },
        error: (error) => console.error('Error deleting job:', error)
      });
    }
  }

}
