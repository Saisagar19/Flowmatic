import { redirect } from "next/navigation";

export default function RootPage() {
  // Automatically redirect anyone visiting '/' to '/workflows'
  redirect("/workflows");
}