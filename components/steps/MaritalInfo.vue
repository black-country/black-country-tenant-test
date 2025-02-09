<!-- <template>
    <div class="step">
      <h2>{{ title }}</h2>
      <div class="form-group">
        <label>Marital Status</label>
        <select v-model="localForm.maritalStatus">
          <option value="single">Single</option>
          <option value="married">Married</option>
        </select>
      </div>
      
      <div v-if="localForm.maritalStatus === 'married'">
        <div class="form-group">
          <label>Spouse Full Name</label>
          <input type="text" v-model="localForm.spouse.name" required />
        </div>
        <div class="form-group">
          <label>Spouse Email</label>
          <input type="email" v-model="localForm.spouse.email" required />
        </div>
        <div class="form-group">
          <label>Spouse Phone Number</label>
          <input type="text" v-model="localForm.spouse.phone" required />
        </div>
        <div class="form-group">
          <label>Upload Spouse's ID</label>
          <input type="file" @change="handleFileUpload" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, reactive, watch } from "vue";
  
  const props = defineProps(["title", "form"]);
  const emit = defineEmits(["update:form"]);
  
  const localForm = reactive({ ...props.form });
  
  const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) localForm.spouse.id = file;
  };
  
  watch(localForm, () => {
    emit("update:form", localForm);
  });
  </script>
   -->

   <template>
    <div class="step">
      <h2>{{ title }}</h2>
  
      <div class="form-group">
        <label>Marital Status *</label>
        <select v-model="localForm.maritalStatus" required>
          <option value="single">Single</option>
          <option value="married">Married</option>
        </select>
      </div>
  
      <div v-if="localForm.maritalStatus === 'married'">
        <div class="form-group">
          <label>Full Name *</label>
          <input type="text" v-model="localForm.spouse.name" required />
        </div>
        <div class="form-group">
          <label>Email Address *</label>
          <input type="email" v-model="localForm.spouse.email" required />
        </div>
        <div class="form-group">
          <label>Phone Number *</label>
          <input type="text" v-model="localForm.spouse.phone" required />
        </div>
  
        <h3>Upload a clear photo of your spouse’s ID</h3>
        <div class="form-group">
          <label>ID Type</label>
          <select v-model="localForm.spouse.idType">
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
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, reactive, watch } from "vue";
  
  const props = defineProps(["title", "form"]);
  const emit = defineEmits(["update:form"]);
  
  const localForm = reactive({
    maritalStatus: props.form.maritalStatus || "single",
    spouse: props.form.spouse || { name: null, email: null, phone: null, idType: null, id: null }
  });
  
  const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) localForm.spouse.id = file;
  };
  
  watch(localForm, () => {
    emit("update:form", { ...props.form, maritalStatus: localForm.maritalStatus, spouse: localForm.spouse });
  });
  </script>
  