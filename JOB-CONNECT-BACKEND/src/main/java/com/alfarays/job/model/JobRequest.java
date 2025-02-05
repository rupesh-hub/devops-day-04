package com.alfarays.job.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobRequest {

    private String title;
    private String description;
    private String company;

}
