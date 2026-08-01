import { Landing } from "@/components/Landing";
import { connection } from "next/server";

export default async function Home() {
  // Nonce-based CSP requires dynamic rendering (Next.js CSP guide)
  await connection();
  return <Landing />;
}
