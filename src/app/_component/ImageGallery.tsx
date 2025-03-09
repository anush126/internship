"use client";

import { useState } from "react";
import ImageModal from "./ImageModal";

interface Image {
  id: number;
  name: string;
  url: string;
  userid: string;
}

interface ImageGalleryProps {
  images: Image[];
}

export default function ImageGallery({ images: initialImages }: ImageGalleryProps) {
  const [images, setImages] = useState<Image[]>(initialImages);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const openModal = (image: Image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleDeleteImage = async (imageId: number) => {
    try {
      const response = await fetch(`/api/delete-image?id=${imageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete image');
      }

      // Remove the deleted image from the state
      setImages(images.filter(img => img.id !== imageId));
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="w-48 cursor-pointer transition-transform hover:scale-105"
            onClick={() => openModal(image)}
          >
            <img 
              src={image.url} 
              alt={image.name}
              className="w-full rounded-lg object-cover shadow-md" 
              style={{ height: "150px" }}
            />
            <div className="mt-1 truncate text-center">{image.name}</div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          imageName={selectedImage.name}
          imageId={selectedImage.id}
          onClose={closeModal}
          onDelete={handleDeleteImage}
        />
      )}
    </>
  );
}