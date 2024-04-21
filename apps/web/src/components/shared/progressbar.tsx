"use client"
import { Next13ProgressBar } from "next13-progressbar";

export const Progressbar = () => (
  <Next13ProgressBar
    height="2px"
    color="hsl(263.4 70% 50.4%)"
    options={{ showSpinner: false }}
    showOnShallow
  />
);
