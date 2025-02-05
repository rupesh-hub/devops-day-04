package com.alfarays.job.service;

import com.alfarays.job.entity.Job;
import com.alfarays.job.model.JobRequest;
import com.alfarays.job.model.JobResponse;
import com.alfarays.job.repository.JobRepository;
import com.alfarays.util.GlobalResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService implements IJobService {

    private final JobRepository jobRepository;

    @Override
    public GlobalResponse<JobResponse> createJob(JobRequest request) {
        try {
            Job job = Job.builder()
                    .title(request.getTitle())
                    .description(request.getDescription())
                    .company(request.getCompany())
                    .build();

            Job savedJob = jobRepository.save(job);
            return GlobalResponse.success(mapToJobResponse(savedJob));
        } catch (Exception e) {
            throw new IllegalStateException();
        }
    }

    @Override
    public GlobalResponse<JobResponse> getJobById(Long id) {
        try {
            Job job = jobRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Job not found with id: " + id));
            return GlobalResponse.success(mapToJobResponse(job));
        } catch (EntityNotFoundException e) {
           throw new IllegalStateException(e.getMessage());
        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    @Override
    public GlobalResponse<Void> deleteJobById(Long id) {
        try {
            if (!jobRepository.existsById(id)) {
                throw new IllegalStateException(
                        "Job not found with id: " + id
                );
            }
            jobRepository.deleteById(id);
            return GlobalResponse.success();
        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    @Override
    public GlobalResponse<List<JobResponse>> getAllJobs() {
        try {
            List<Job> jobs = jobRepository.findAll();
            List<JobResponse> responses = jobs.stream()
                    .map(this::mapToJobResponse)
                    .collect(Collectors.toList());
            return GlobalResponse.success(responses);
        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    @Override
    public GlobalResponse<Void> updateJob(Long id, JobRequest request) {
        try {
            Job job = jobRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Job not found with id: " + id));

            job.setTitle(request.getTitle());
            job.setDescription(request.getDescription());
            job.setCompany(request.getCompany());

            jobRepository.save(job);
            return GlobalResponse.success();
        } catch (EntityNotFoundException e) {
            throw new IllegalStateException(e.getMessage());
        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    @Override
    public GlobalResponse<Void> enableJob(Long id) {
        return updateJobStatus(id, true, "enable");
    }

    @Override
    public GlobalResponse<Void> disableJob(Long id) {
        return updateJobStatus(id, false, "disable");
    }

    @Override
    public GlobalResponse<Void> archiveJob(Long id) {
//        try {
//            Job job = jobRepository.findById(id)
//                    .orElseThrow(() -> new EntityNotFoundException("Job not found with id: " + id));
//
//            job.setArchived(true);
//            job.setUpdatedAt(LocalDateTime.now());
//            job.setUpdatedBy("SYSTEM");
//
//            jobRepository.save(job);
//            return GlobalResponse.success();
//        } catch (EntityNotFoundException e) {
//            return GlobalResponse.error(e.getMessage());
//        } catch (Exception e) {
//            return GlobalResponse.error("Failed to archive job: " + e.getMessage());
//        }
        return null;
    }

    @Override
    public GlobalResponse<Void> unArchiveJob(Long id) {
//        try {
//            Job job = jobRepository.findById(id)
//                    .orElseThrow(() -> new EntityNotFoundException("Job not found with id: " + id));
//
//            job.setArchived(false);
//            job.setUpdatedAt(LocalDateTime.now());
//            job.setUpdatedBy("SYSTEM");
//
//            jobRepository.save(job);
//            return GlobalResponse.success();
//        } catch (EntityNotFoundException e) {
//            return GlobalResponse.error(e.getMessage());
//        } catch (Exception e) {
//            return GlobalResponse.error("Failed to unarchive job: " + e.getMessage());
//        }
        return null;
    }

    private GlobalResponse<Void> updateJobStatus(Long id, boolean status, String operation) {
        try {
            Job job = jobRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Job not found with id: " + id));

            job.setEnabled(status);
            job.setUpdatedAt(LocalDateTime.now());
            job.setUpdatedBy("SYSTEM");

            jobRepository.save(job);
            return GlobalResponse.success();
        } catch (EntityNotFoundException e) {
            throw new IllegalStateException(e.getMessage());
        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    private JobResponse mapToJobResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .company(job.getCompany())
                .createdAt(job.getCreatedAt())
                .createdBy(job.getCreatedBy())
                .updatedAt(job.getUpdatedAt())
                .updatedBy(job.getUpdatedBy())
                .enabled(job.getEnabled())
                .build();
    }
}