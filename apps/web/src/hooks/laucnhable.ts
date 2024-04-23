import { create } from "zustand";

interface LaunchState {
  launchable: boolean;
  setLaunchbale: (by: boolean) => void;
}

export const useLaunchable = create<LaunchState>()((set) => ({
  launchable: true,
  setLaunchbale: (launchable) => set(() => ({ launchable })),
}));
