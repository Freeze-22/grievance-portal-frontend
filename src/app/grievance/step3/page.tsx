"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, MenuItem, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { step3Schema, Step3Data } from "@/lib/schemas";
import { saveDraft, loadDraft } from "@/lib/formStore";

export default function Step3() {
  const router = useRouter();
  const { register, handleSubmit, reset, control, watch, formState: { errors } } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      witnesses: "",
      previouslyReported: "",
      desiredResolution: "",
      additionalComments: "",
    }
  });

  useEffect(() => {
    const draft = loadDraft();
    if (Object.keys(draft).length > 0) {
      reset({
        witnesses: draft.witnesses || "",
        previouslyReported: draft.previouslyReported || "",
        desiredResolution: draft.desiredResolution || "",
        additionalComments: draft.additionalComments || "",
      });
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((values) => {
      saveDraft(values as Step3Data);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: Step3Data) => {
    saveDraft(data);
    router.push("/grievance/review");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>Supporting Information</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Provide any additional context to support your grievance.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            label="Witnesses (optional)"
            placeholder="Names of any witnesses, separated by commas"
            {...register("witnesses")}
            InputLabelProps={{ shrink: true }}
            helperText="Optional: list anyone who witnessed the incident"
          />
          <Controller
            name="previouslyReported"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Previously Reported?"
                error={!!errors.previouslyReported}
                helperText={errors.previouslyReported?.message}
              >
                {["Yes - to HR", "Yes - to Manager", "Yes - to Both", "No"].map((o) => (
                  <MenuItem key={o} value={o}>{o}</MenuItem>
                ))}
              </TextField>
            )}
          />
          <TextField
            label="Desired Resolution"
            multiline rows={3}
            placeholder="What outcome are you hoping for?"
            {...register("desiredResolution")}
            error={!!errors.desiredResolution}
            helperText={errors.desiredResolution?.message}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Additional Comments (optional)"
            multiline rows={3}
            placeholder="Any other information you would like to share"
            {...register("additionalComments")}
            InputLabelProps={{ shrink: true }}
          />
          <Stack direction="row" justifyContent="space-between" pt={1}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => router.push("/grievance/step2")}>Back</Button>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<SaveIcon />} onClick={() => alert("Draft auto-saved!")}>Save Draft</Button>
              <Button type="submit" variant="contained" endIcon={<ArrowForwardIcon />}>Review & Submit</Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}
