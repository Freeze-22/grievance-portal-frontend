"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, MenuItem, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveIcon from "@mui/icons-material/Save";
import { step1Schema, Step1Data } from "@/lib/schemas";
import { saveDraft, loadDraft } from "@/lib/formStore";

const departments = ["Engineering", "HR", "Finance", "Marketing", "Operations", "Legal", "Sales"];

export default function Step1() {
  const router = useRouter();
  const { register, handleSubmit, reset, control, watch, formState: { errors } } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: "",
      email: "",
      employeeId: "",
      department: "",
      phone: "",
    }
  });

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft();
    if (Object.keys(draft).length > 0) {
      reset({
        fullName: draft.fullName || "",
        email: draft.email || "",
        employeeId: draft.employeeId || "",
        department: draft.department || "",
        phone: draft.phone || "",
      });
    }
  }, [reset]);

  // Auto-save on every change
  useEffect(() => {
    const subscription = watch((values) => {
      saveDraft(values as Step1Data);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: Step1Data) => {
    saveDraft(data);
    router.push("/grievance/step2");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>Personal Information</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Please provide your personal details so we can process your grievance.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Full Name"
              {...register("fullName")}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Employee ID"
              {...register("employeeId")}
              error={!!errors.employeeId}
              helperText={errors.employeeId?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <TextField
            label="Email Address"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{ shrink: true }}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Phone Number"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputLabelProps={{ shrink: true }}
            />
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Department"
                  error={!!errors.department}
                  helperText={errors.department?.message}
                >
                  {departments.map((d) => (
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
          <Stack direction="row" justifyContent="space-between" pt={1}>
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={() => alert("Draft auto-saved!")}
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
            >
              Next Step
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}
