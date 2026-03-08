import { FormData } from "./schemas";

const STORAGE_KEY = "grievance_draft";

export function saveDraft(data: Partial<FormData>): void {
  if (typeof window === "undefined") return;
  const existing = loadDraft();
  const merged = { ...existing, ...data };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}

export function loadDraft(): Partial<FormData> {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
