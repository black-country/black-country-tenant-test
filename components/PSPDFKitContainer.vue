// src/components/PSPDFKitContainer.vue
<script lang="ts" setup>
import { ref, watch, onMounted, defineProps, defineEmits, onBeforeUnmount } from 'vue';

const PSPDFKit = await import('pspdfkit'); // Use dynamic import

const props = defineProps({
  pdfFile: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['loaded']);
const pdfContainer = ref<HTMLDivElement | null>(null);

// Method to load PSPDFKit and the document
const loadPSPDFKit = async () => {
  if (pdfContainer.value) {
    PSPDFKit.default.unload(pdfContainer.value); // Ensure to use .default if it is an ES module
    const instance = await PSPDFKit.default.load({
      document: props.pdfFile,
      container: pdfContainer.value,
    });
    emit('loaded', instance);
  }
};

watch(() => props.pdfFile, loadPSPDFKit, { immediate: true });

onMounted(loadPSPDFKit);

onBeforeUnmount(() => {
  if (pdfContainer.value) {
    PSPDFKit.default.unload(pdfContainer.value);
  }
});
</script>
