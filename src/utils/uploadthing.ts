"use client";
import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
  
  import type { OurFileRouter } from "src/app/api/uploadthing/core";
  
  export const UploadButton = generateUploadButton<OurFileRoutr>();
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
  