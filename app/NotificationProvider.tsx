"use client";

import { watchEvents } from "./lib/client-services/quicknode";
import { useEffect } from "react";

export default function NotificationProvider({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    let listeners: any;
    async function startListeners() {
      listeners = await watchEvents();
    }

    startListeners();
    console.log("listen on blockchain events");

    return () => {
      listeners.forEach((l: any) => {
        l();
      });
    };
  }, []);

  return (
    <div>
      {children}
    </div>
  );
}