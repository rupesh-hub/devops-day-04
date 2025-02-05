package com.alfarays.job.entity;

import com.alfarays.shared.AbstractEntity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "_jobs")
@ToString
public class Job extends AbstractEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_job_id_seq_generator")
    @SequenceGenerator(name = "_job_id_seq_generator", sequenceName = "_job_id_seq", allocationSize = 1, initialValue = 1)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private Long id;

    private String title;
    private String description;
    private String company;

}
