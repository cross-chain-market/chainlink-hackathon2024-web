"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
  fontFamily: "Verdana, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: { fontFamily: "Greycliff CF, sans-serif" },
});

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <MantineProvider theme={theme}>
      <Notifications />
      {children}
    </MantineProvider>
  );
}