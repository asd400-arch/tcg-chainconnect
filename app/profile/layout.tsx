import { AppNavbar } from "@/components/layout/AppNavbar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavbar />
      {children}
    </>
  );
}
