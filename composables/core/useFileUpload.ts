// // composables/useFileUpload.ts
// import { ref } from 'vue'

// export const useFileUpload = () => {
//   const uploadedFile = ref<File | null>(null)
//   const previewUrl = ref<string>('')

//   const handleFileUpload = (event: Event) => {
//     const input = event.target as HTMLInputElement
//     if (input.files && input.files[0]) {
//       uploadedFile.value = input.files[0]
//       previewUrl.value = URL.createObjectURL(input.files[0])
//     }
//   }

//   return {
//     uploadedFile,
//     previewUrl,
//     handleFileUpload
//   }
// }
// composables/useFileUpload.ts
import { ref } from 'vue'

export const useFileUpload = () => {
  const uploadedFile = ref<File | null>(null)
  const previewUrl = ref<string>('')
  const isCompressing = ref<boolean>(false)
  const originalSize = ref<number>(0)
  const compressedSize = ref<number>(0)

  // Function to compress image with target size in kilobytes
  const compressImage = async (file: File, targetKB: number = 100): Promise<File> => {
    // Skip compression for non-image files
    if (!file.type.startsWith('image/')) {
      return file;
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          // Calculate scaled dimensions
          let width = img.width;
          let height = img.height;
          
          // Maximum dimensions
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          
          // Scale down dimensions
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }
          
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compression strategy with iterative quality reduction
          const targetSize = targetKB * 1024; // Convert KB to bytes
          let quality = 0.7; // Start with 70% quality
          
          const compressWithQuality = (currentQuality: number) => {
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error('Canvas to Blob conversion failed'));
                  return;
                }
                
                // If blob is still too large and quality can be reduced further
                if (blob.size > targetSize && currentQuality > 0.1) {
                  // Reduce quality and try again
                  compressWithQuality(currentQuality - 0.1);
                } else {
                  // Create new file from the compressed blob
                  const compressedFile = new File(
                    [blob], 
                    file.name.replace(/\.[^/.]+$/, "") + ".jpg", // Force .jpg extension
                    { type: 'image/jpeg', lastModified: Date.now() }
                  );
                  
                  // Store sizes for reference
                  originalSize.value = file.size;
                  compressedSize.value = compressedFile.size;
                  
                  console.log(`Compressed from ${(file.size/1024).toFixed(2)}KB to ${(compressedFile.size/1024).toFixed(2)}KB`);
                  resolve(compressedFile);
                }
              },
              'image/jpeg',
              currentQuality
            );
          };
          
          compressWithQuality(quality);
        };
        img.onerror = () => {
          reject(new Error('Image loading failed'));
        };
      };
      reader.onerror = () => {
        reject(new Error('File reading failed'));
      };
    });
  };

  const handleFileUpload = async (event: Event, options = { targetKB: 100, compress: true }) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      const file = input.files[0]
      
      // Store original file temporarily
      const originalFile = file
      
      // Set preview of original file immediately for better UX
      previewUrl.value = URL.createObjectURL(originalFile)
      
      // Only compress if it's an image and compression is enabled
      if (file.type.startsWith('image/') && options.compress) {
        try {
          isCompressing.value = true
          const compressed = await compressImage(file, options.targetKB)
          uploadedFile.value = compressed
          
          // Update preview with compressed file
          URL.revokeObjectURL(previewUrl.value) // Clean up previous object URL
          previewUrl.value = URL.createObjectURL(compressed)
        } catch (error) {
          console.error('Compression failed:', error)
          // Fallback to original file if compression fails
          uploadedFile.value = originalFile
        } finally {
          isCompressing.value = false
        }
      } else {
        // Use original file for non-images
        uploadedFile.value = originalFile
      }
    }
  }

  const reset = () => {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value) // Clean up object URL
    }
    uploadedFile.value = null
    previewUrl.value = ''
    originalSize.value = 0
    compressedSize.value = 0
  }

  return {
    uploadedFile,
    previewUrl,
    isCompressing,
    originalSize,
    compressedSize,
    handleFileUpload,
    reset
  }
}