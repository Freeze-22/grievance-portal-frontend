"use client";

import { ReactNode } from "react";
import { Box, Container, Paper, Stepper, Step, StepLabel, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

const steps = ["Personal Info", "Grievance Details", "Supporting Info", "Review & Submit"];

function getActiveStep(pathname: string) {
  if (pathname.includes("step1")) return 0;
  if (pathname.includes("step2")) return 1;
  if (pathname.includes("step3")) return 2;
  if (pathname.includes("review")) return 3;
  return 0;
}

export default function GrievanceLayout({ children }) {
  const pathname = usePathname();
  const activeStep = getActiveStep(pathname);

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", py: 4, px: 2 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" sx={{ color: "white", fontWeight: 700, mb: 1 }}>
            Grievance Portal
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)" }}>
            Submit and track your workplace grievances
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": { color: "rgba(255,255,255,0.8)" },
                    "& .MuiStepLabel-label.Mui-active": { color: "white", fontWeight: 600 },
                    "& .MuiStepLabel-label.Mui-completed": { color: "rgba(255,255,255,0.9)" },
                    "& .MuiStepIcon-root": { color: "rgba(255,255,255,0.4)" },
                    "& .MuiStepIcon-root.Mui-active": { color: "white" },
                    "& .MuiStepIcon-root.Mui-completed": { color: "rgba(255,255,255,0.9)" },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
          {children}
        </Paper>
      </Container>
    </Box>
  );
}