"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Stack, Chip, Divider, Paper, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import { loadDraft, clearDraft } from "@/lib/formStore";
import { FormData } from "@/lib/schemas";

function ReviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ py: 1.5, borderBottom: "1px solid #f0f0f0" }}>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 180, fontWeight: 500 }}>{label}</Typography>
      <Typography variant="body2">{value || "-"}</Typography>
    </Stack>
  );
}

export default function ReviewPage() {
  const router = useRouter();
  const [data, setData] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => { setData(loadDraft()); }, []);
  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    clearDraft();
    setSubmitted(true);
    setLoading(false);
  };
  if (submitted) {
    return (
      <Box sx={{ p: 6, textAlign: "center" }}>
        <CheckCircleIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
        <Typography variant="h4" fontWeight={700} mb={1}>Grievance Submitted!</Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>Your grievance has been submitted. You will receive a confirmation email shortly.</Typography>
        <Chip label={"Reference: GRV-" + Date.now().toString().slice(-6)} color="primary" sx={{ fontSize: "1rem", p: 2 }} />
        <Box mt={4}><Button variant="contained" onClick={() => router.push("/grievance/step1")}>Submit Another</Button></Box>
      </Box>
    );
  }
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>Review and Submit</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Please review all your information before submitting.</Typography>
      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="h6" fontSize="1rem" fontWeight={600}>Personal Information</Typography>
            <Button size="small" startIcon={<EditIcon />} onClick={() => router.push("/grievance/step1")}>Edit</Button>
          </Stack>
          <Divider sx={{ mb: 1 }} />
          <ReviewRow label="Full Name" value={data.fullName} />
          <ReviewRow label="Employee ID" value={data.employeeId} />
          <ReviewRow label="Email" value={data.email} />
          <ReviewRow label="Phone" value={data.phone} />
          <ReviewRow label="Department" value={data.department} />
        </Paper>
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="h6" fontSize="1rem" fontWeight={600}>Grievance Details</Typography>
            <Button size="small" startIcon={<EditIcon />} onClick={() => router.push("/grievance/step2")}>Edit</Button>
          </Stack>
          <Divider sx={{ mb: 1 }} />
          <ReviewRow label="Grievance Type" value={data.grievanceType} />
          <ReviewRow label="Severity" value={data.severity} />
          <ReviewRow label="Incident Date" value={data.incidentDate} />
          <ReviewRow label="Subject" value={data.subject} />
          <ReviewRow label="Description" value={data.description} />
        </Paper>
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="h6" fontSize="1rem" fontWeight={600}>Supporting Information</Typography>
            <Button size="small" startIcon={<EditIcon />} onClick={() => router.push("/grievance/step3")}>Edit</Button>
          </Stack>
          <Divider sx={{ mb: 1 }} />
          <ReviewRow label="Witnesses" value={data.witnesses || "None"} />
          <ReviewRow label="Previously Reported" value={data.previouslyReported} />
          <ReviewRow label="Desired Resolution" value={data.desiredResolution} />
          <ReviewRow label="Additional Comments" value={data.additionalComments || "None"} />
        </Paper>
        <Stack direction="row" justifyContent="space-between" pt={1}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => router.push("/grievance/step3")}>Back</Button>
          <Button variant="contained" endIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SendIcon />} onClick={handleSubmit} disabled={loading} sx={{ minWidth: 160 }}>
            {loading ? "Submitting..." : "Submit Grievance"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}