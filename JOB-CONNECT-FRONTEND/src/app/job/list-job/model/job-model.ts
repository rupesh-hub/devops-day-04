export interface JobRequest {
  title: string;
  description: string;
  company: string;
}

export interface JobResponse {
  id: number;
  title: string;
  description: string;
  company: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  enabled: boolean;
}

export interface GlobalResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
  errors?: Record<string, string>;
}
