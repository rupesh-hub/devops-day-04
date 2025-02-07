import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JobService} from "../job-service.service";

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.scss'
})
export class CreateJobComponent {

  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _jobService: JobService
  ) {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      company: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      console.log(this.jobForm.value);
      this._jobService.createJob(this.jobForm.value).subscribe({
        next: (response) => {
          console.log('Job created:', response.data);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error creating job:', error);
        }
      })
    } else {
      Object.keys(this.jobForm.controls).forEach(key => {
        const control = this.jobForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  getErrorMessage(field: string): string {
    const control = this.jobForm.get(field);

    if (control?.errors) {
      if (control.errors['required']) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${requiredLength} characters`;
      }
    }
    return '';
  }

}
