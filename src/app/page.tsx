export const dynamic = "force-dynamic"; // ✅ Correct way

import Link from "next/link";
import {db} from "pnpm/server/db/index";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { myimages } from "pnpm/server/queries";
import ImageGallery from "./_component/ImageGallery";


export default async function HomePage() {
  const posts = await myimages();
  console.log(posts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <SignedOut>please sign in</SignedOut>
      <SignedIn>
        <ImageGallery images={posts} />
      </SignedIn>
    </main>
  );
}