// composables/useFileUpload.ts
import { ref } from 'vue'

export const useFileUpload = () => {
  const uploadedFile = ref<File | null>(null)
  const previewUrl = ref<string>('')

  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      uploadedFile.value = input.files[0]
      previewUrl.value = URL.createObjectURL(input.files[0])
    }
  }

  return {
    uploadedFile,
    previewUrl,
    handleFileUpload
  }
}