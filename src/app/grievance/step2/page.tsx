"use client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, MenuItem, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { step2Schema, Step2Data } from "@/lib/schemas";
import { saveDraft, loadDraft } from "@/lib/formStore";

const grievanceTypes = ["Harassment","Discrimination","Unfair Treatment","Safety Concern","Pay Dispute","Policy Violation","Other"];
const severityLevels = ["Low","Medium","High","Critical"];

export default function Step2() {
  const router = useRouter();
  const { register, handleSubmit, reset, control, watch, formState: { errors } } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { grievanceType: "", severity: "", incidentDate: "", subject: "", description: "" }
  });
  useEffect(() => {
    const draft = loadDraft();
    if (Object.keys(draft).length > 0) reset({ grievanceType: draft.grievanceType || "", severity: draft.severity || "", incidentDate: draft.incidentDate || "", subject: draft.subject || "", description: draft.description || "" });
  }, [reset]);
  useEffect(() => {
    const sub = watch((v) => saveDraft(v as Step2Data));
    return () => sub.unsubscribe();
  }, [watch]);
  const onSubmit = (data: Step2Data) => { saveDraft(data); router.push("/grievance/step3"); };
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>Grievance Details</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Describe the incident and provide relevant details.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller name="grievanceType" control={control} render={({ field }) => (
              <TextField {...field} select fullWidth label="Grievance Type" error={Boolean(errors.grievanceType)} helperText={errors.grievanceType?.message}>
                {grievanceTypes.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
            )} />
            <Controller name="severity" control={control} render={({ field }) => (
              <TextField {...field} select fullWidth label="Severity Level" error={Boolean(errors.severity)} helperText={errors.severity?.message}>
                {severityLevels.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
            )} />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField label="Incident Date" type="date" InputLabelProps={{ shrink: true }} {...register("incidentDate")} error={Boolean(errors.incidentDate)} helperText={errors.incidentDate?.message} />
            <TextField label="Subject" {...register("subject")} error={Boolean(errors.subject)} helperText={errors.subject?.message} InputLabelProps={{ shrink: true }} />
          </Stack>
          <TextField label="Description" multiline rows={4} {...register("description")} error={Boolean(errors.description)} helperText={errors.description?.message || "Min. 20 characters"} InputLabelProps={{ shrink: true }} />
          <Stack direction="row" justifyContent="space-between" pt={1}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => router.push("/grievance/step1")}>Back</Button>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<SaveIcon />} onClick={() => alert("Draft saved!")}>Save Draft</Button>
              <Button type="submit" variant="contained" endIcon={<ArrowForwardIcon />}>Next Step</Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}