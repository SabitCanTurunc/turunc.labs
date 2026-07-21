// This page is not directly accessible — middleware redirects / → /tr or /en
// based on the Accept-Language header.
// Keeping this as a safety fallback.
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/tr");
}
