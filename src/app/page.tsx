import { redirect } from "next/navigation";

// keep the root route alive solely to forward users to /about
export default function Home() {
  redirect("/about");
  // redirect throws a Response, but we return null to satisfy TS/React
  return null;
}
