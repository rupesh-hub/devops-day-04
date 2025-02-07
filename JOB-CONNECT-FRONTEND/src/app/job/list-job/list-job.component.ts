import {Component} from '@angular/core';
import {GlobalResponse, JobResponse} from "./model/job-model";
import {JobService} from "../job-service.service";
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";

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
  processingIds: Set<number> = new Set(); // Track jobs being processed

  constructor(private jobService: JobService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;
    this.error = null;

    this.jobService.allJobs().subscribe({
      next: (response: GlobalResponse<JobResponse[]>) => {
        if (response.data) {
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
    this.router.navigate(['/edit', job.id]);
  }

  isProcessing(jobId: number): boolean {
    return this.processingIds.has(jobId);
  }

  toggleJobStatus(job: JobResponse): void {
    if (this.isProcessing(job.id)) return;

    this.processingIds.add(job.id);
    const action = job.enabled ? this.jobService.disableJob(job.id) : this.jobService.enableJob(job.id);

    action.subscribe({
      next: (response) => {
        if (response.success) {
          const updatedJobs = this.jobs.map(j =>
            j.id === job.id ? {...j, enabled: !j.enabled} : j
          );
          this.jobs = updatedJobs;
        }
      },
      error: (error) => console.error(`Error ${job.enabled ? 'disabling' : 'enabling'} job:`, error),
      complete: () => {
        this.processingIds.delete(job.id);
      }
    });
  }

  deleteJob(job: JobResponse): void {
    if (this.isProcessing(job.id) || !confirm('Are you sure you want to delete this job?')) return;

    this.processingIds.add(job.id);
    this.jobService.deleteJob(job.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.jobs = this.jobs.filter(j => j.id !== job.id);
        }
      },
      error: (error) => console.error('Error deleting job:', error),
      complete: () => {
        this.processingIds.delete(job.id);
      }
    });
  }

  createJob(): void {
    this.router.navigate(['/create']);
  }

  activeJobsCount = (): number => {
    return this.jobs.filter(job => job.enabled).length;
  }
  inactiveJobsCount = (): number => {
    return this.jobs.filter(job => !job.enabled).length;
  }
}
