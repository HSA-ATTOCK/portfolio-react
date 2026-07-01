"use client";
import { useBackendWakeup } from "../hooks/useBackendWakeup";

export default function BackendWakeup() {
  useBackendWakeup();
  return null;
}
