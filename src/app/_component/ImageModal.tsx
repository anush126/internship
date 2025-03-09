"use client";

import { useEffect, useRef, useState } from "react";

interface ImageModalProps {
  imageUrl: string;
  imageName: string;
  imageId: number;
  onClose: () => void;
  onDelete?: (imageId: number) => void;
}

export default function ImageModal({ imageUrl, imageName, imageId, onClose, onDelete }: ImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Close modal when clicking outside the image
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
    
    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  // Close on escape key press
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete(imageId);
      onClose();
    } catch (error) {
      console.error("Failed to delete image:", error);
    } finally {
      setIsDeleting(false);
      setShowConfirmation(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div 
        ref={modalRef}
        className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-white p-2"
      >
        <div className="absolute right-2 top-2 z-10 flex gap-2">
          {onDelete && (
            <button 
              onClick={() => setShowConfirmation(true)}
              className="rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
              aria-label="Delete"
              disabled={isDeleting}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
          <button 
            onClick={onClose}
            className="rounded-full bg-gray-800 p-1 text-white hover:bg-gray-600"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <img 
            src={imageUrl} 
            alt={imageName} 
            className="max-h-[80vh] max-w-full object-contain"
          />
          <div className="mt-2 text-center text-lg font-medium text-gray-800">{imageName}</div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-80 rounded-lg bg-white p-4 shadow-lg">
              <h3 className="mb-3 text-lg font-medium text-black">Delete Image</h3>
              <p className="mb-4 text-black">Are you sure you want to delete this image? This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setShowConfirmation(false)} 
                  className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete} 
                  className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}