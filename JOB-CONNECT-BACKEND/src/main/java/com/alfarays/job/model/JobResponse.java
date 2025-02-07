package com.alfarays.job.model;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobResponse {

    private Long id;
    private String title;
    private String description;
    private String company;
    private Date createdAt;
    private String createdBy;
    private Date updatedAt;
    private String updatedBy;
    private boolean enabled;

}
