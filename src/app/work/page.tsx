import { permanentRedirect } from "next/navigation";

// The portfolio is one page now: /work lives at the Projects section of the home page.
export default function Work() {
  permanentRedirect("/#work");
}
