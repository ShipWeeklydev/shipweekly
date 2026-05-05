import { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { RightSidebar } from "./right-sidebar";

interface AppShellProps {
  children: ReactNode;
  noRightSidebar?: boolean;
}

export function AppShell({ children, noRightSidebar = false }: AppShellProps) {
  return (
    <div className="flex min-h-svh w-full bg-background relative max-w-[1600px] mx-auto">
      {/* Left Sidebar (Desktop) */}
      <AppSidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col items-center">
        <div className="w-full max-w-3xl">
          {children}
        </div>
      </main>

      {/* Right Sidebar (Desktop XL) — hidden when noRightSidebar=true */}
      {!noRightSidebar && <RightSidebar />}
    </div>
  );
}
