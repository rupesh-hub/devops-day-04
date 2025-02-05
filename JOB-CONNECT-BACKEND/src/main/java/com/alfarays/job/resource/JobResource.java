package com.alfarays.job.resource;

import com.alfarays.job.model.JobRequest;
import com.alfarays.job.model.JobResponse;
import com.alfarays.job.service.IJobService;
import com.alfarays.util.GlobalResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
@Tag(name = "Job Controller", description = "Job management APIs")
@Slf4j
public class JobResource {

    private final IJobService jobService;

    @PostMapping
    @Operation(summary = "Create a new job")
    @ApiResponse(responseCode = "201", description = "Job created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    public ResponseEntity<GlobalResponse<JobResponse>> createJob(
            @RequestBody @Valid JobRequest request) {
        log.info("Creating new job with title: {}", request.getTitle());
        GlobalResponse<JobResponse> response = jobService.createJob(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get job by ID")
    @ApiResponse(responseCode = "200", description = "Job found")
    @ApiResponse(responseCode = "404", description = "Job not found")
    public ResponseEntity<GlobalResponse<JobResponse>> getJobById(
            @PathVariable Long id) {
        log.info("Fetching job with id: {}", id);
        GlobalResponse<JobResponse> response = jobService.getJobById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @Operation(summary = "Get all jobs")
    @ApiResponse(responseCode = "200", description = "List of all jobs")
    public ResponseEntity<GlobalResponse<List<JobResponse>>> getAllJobs() {
        log.info("Fetching all jobs");
        GlobalResponse<List<JobResponse>> response = jobService.getAllJobs();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update job by ID")
    @ApiResponse(responseCode = "200", description = "Job updated successfully")
    @ApiResponse(responseCode = "404", description = "Job not found")
    public ResponseEntity<GlobalResponse<Void>> updateJob(
            @PathVariable Long id,
            @RequestBody @Valid JobRequest request) {
        log.info("Updating job with id: {}", id);
        GlobalResponse<Void> response = jobService.updateJob(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete job by ID")
    @ApiResponse(responseCode = "200", description = "Job deleted successfully")
    @ApiResponse(responseCode = "404", description = "Job not found")
    public ResponseEntity<GlobalResponse<Void>> deleteJobById(
            @PathVariable Long id) {
        log.info("Deleting job with id: {}", id);
        GlobalResponse<Void> response = jobService.deleteJobById(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/enable")
    @Operation(summary = "Enable job by ID")
    @ApiResponse(responseCode = "200", description = "Job enabled successfully")
    @ApiResponse(responseCode = "404", description = "Job not found")
    public ResponseEntity<GlobalResponse<Void>> enableJob(
            @PathVariable Long id) {
        log.info("Enabling job with id: {}", id);
        GlobalResponse<Void> response = jobService.enableJob(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/disable")
    @Operation(summary = "Disable job by ID")
    @ApiResponse(responseCode = "200", description = "Job disabled successfully")
    @ApiResponse(responseCode = "404", description = "Job not found")
    public ResponseEntity<GlobalResponse<Void>> disableJob(
            @PathVariable Long id) {
        log.info("Disabling job with id: {}", id);
        GlobalResponse<Void> response = jobService.disableJob(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/archive")
    @Operation(summary = "Archive job by ID")
    @ApiResponse(responseCode = "200", description = "Job archived successfully")
    @ApiResponse(responseCode = "404", description = "Job not found")
    public ResponseEntity<GlobalResponse<Void>> archiveJob(
            @PathVariable Long id) {
        log.info("Archiving job with id: {}", id);
        GlobalResponse<Void> response = jobService.archiveJob(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/unarchive")
    @Operation(summary = "Unarchive job by ID")
    @ApiResponse(responseCode = "200", description = "Job unarchived successfully")
    @ApiResponse(responseCode = "404", description = "Job not found")
    public ResponseEntity<GlobalResponse<Void>> unarchiveJob(
            @PathVariable Long id) {
        log.info("Un-archiving job with id: {}", id);
        GlobalResponse<Void> response = jobService.unArchiveJob(id);
        return ResponseEntity.ok(response);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public GlobalResponse<Void> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return null;
    }

}
