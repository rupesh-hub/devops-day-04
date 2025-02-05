package com.alfarays.job.service;

import com.alfarays.job.model.JobRequest;
import com.alfarays.job.model.JobResponse;
import com.alfarays.util.GlobalResponse;

import java.util.List;

public interface IJobService {

    GlobalResponse<JobResponse> createJob(JobRequest request);
    GlobalResponse<JobResponse> getJobById(Long id);
    GlobalResponse<Void> deleteJobById(Long id);
    GlobalResponse<List<JobResponse>> getAllJobs();
    GlobalResponse<Void> updateJob(Long id, JobRequest request);
    GlobalResponse<Void> enableJob(Long id);
    GlobalResponse<Void> disableJob(Long id);
    GlobalResponse<Void> archiveJob(Long id);
    GlobalResponse<Void> unArchiveJob(Long id);

}
