import { z } from "zod";

export const step1Schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  employeeId: z.string().min(3, "Employee ID must be at least 3 characters"),
  department: z.string().min(1, "Please select a department"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

export const step2Schema = z.object({
  grievanceType: z.string().min(1, "Please select a grievance type"),
  incidentDate: z.string().min(1, "Please select the incident date"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Please provide at least 20 characters"),
  severity: z.string().min(1, "Please select severity level"),
});

export const step3Schema = z.object({
  witnesses: z.string().optional(),
  previouslyReported: z.string().min(1, "Please select an option"),
  desiredResolution: z.string().min(10, "Please describe your desired resolution"),
  additionalComments: z.string().optional(),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;

export type FormData = Step1Data & Step2Data & Step3Data;
