import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-44">
        <main className="max-w-7xl mx-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;