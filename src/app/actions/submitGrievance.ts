"use server";

import { FormData } from "@/lib/schemas";

export async function submitGrievance(data: Partial<FormData>) {
  // Simulate saving to database
  await new Promise((r) => setTimeout(r, 1000));
  
  const referenceId = "GRV-" + Date.now().toString().slice(-6);
  
  console.log("Grievance submitted:", { referenceId, ...data });
  
  return { success: true, referenceId };
}
