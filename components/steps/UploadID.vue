<!-- <template>
    <div class="step">
      <h2>{{ title }}</h2>
      <div class="form-group">
        <label>Select ID Type</label>
        <select v-model="localForm.idType">
          <option>Driver License</option>
          <option>National ID</option>
          <option>Passport</option>
        </select>
      </div>
      <div class="form-group">
        <label>Upload ID</label>
        <input type="file" @change="handleFileUpload" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, reactive, watch } from "vue";
  
  const props = defineProps(["title", "form"]);
  const emit = defineEmits(["update:form"]);
  
  const localForm = reactive({ ...props.form.idUpload });
  
  const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) localForm.file = file;
  };
  
  watch(localForm, () => {
    emit("update:form", { ...props.form, idUpload: localForm });
  });
  </script>
   -->

   <template>
    <div class="step">
      <h2>{{ title }}</h2>
  
      <h3>Upload a clear photo of your ID card</h3>
      <div class="form-group">
        <label>ID Type</label>
        <select v-model="localForm.idType">
          <option>Driver License</option>
          <option>National ID</option>
          <option>Passport</option>
        </select>
      </div>
  
      <div class="form-group">
        <label>Upload ID</label>
        <input type="file" @change="handleFileUpload" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, reactive, watch } from "vue";
  
  const props = defineProps(["title", "form"]);
  const emit = defineEmits(["update:form"]);
  
  const localForm = reactive(props.form.idUpload || { idType: null, file: null });
  
  const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) localForm.file = file;
  };
  
  watch(localForm, () => {
    emit("update:form", { ...props.form, idUpload: localForm });
  });
  </script>
  