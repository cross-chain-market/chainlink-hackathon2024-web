"use client";

import { useQuickNodeListener } from "./hooks/useQuickNodeListener";

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  useQuickNodeListener();

  return (
    <div>
      {children}
    </div>
  );
}