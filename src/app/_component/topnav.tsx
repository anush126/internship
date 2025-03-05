"use client";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "pnpm/utils/uploadthing";
import React from "react";
  

export default function TopNav() {
  const router=useRouter();
    return (
      <nav className="flex w-full items-center justify-between bg-white p-4 text-xl font-semibold mr-1 border-b p-4">
        <div>
           
            Gallary
          
        </div>
        <div className="flex flex-row items-center gap-4">
         
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
              <UploadButton endpoint={"imageUploader"} onClientUploadComplete={()=>{
                router.refresh();
              }} />
              <UserButton />
            </SignedIn>
          
        </div>
      </nav>
    );
  }