
"use client";

import LoginNavbar from "./LoginNavbar";
import LoginFooter from "./LoginFooter";
import LoginCard from "./LoginCard";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f8f7f2] text-[#304536]">

      <LoginNavbar />

      <section className="flex flex-1 items-center justify-center bg-[#f8f7f2] px-4 py-8">
        <LoginCard />
      </section>

      <LoginFooter />

    </main>
  );
}
