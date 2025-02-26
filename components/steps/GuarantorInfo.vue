<!-- <template>
    <div class="step">
      <h2>{{ title }}</h2>
      <div class="form-group">
        <label>Guarantor Full Name</label>
        <input type="text" v-model="localForm.name" required />
      </div>
      <div class="form-group">
        <label>Relationship</label>
        <input type="text" v-model="localForm.relationship" required />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="localForm.email" required />
      </div>
      <div class="form-group">
        <label>Phone Number</label>
        <input type="text" v-model="localForm.phone" required />
      </div>
      <div class="form-group">
        <label>Upload Guarantor's ID</label>
        <input type="file" @change="handleFileUpload" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, reactive, watch } from "vue";
  
  const props = defineProps(["title", "form"]);
  const emit = defineEmits(["update:form"]);
  
  const localForm = reactive({ ...props.form.guarantor });
  
  const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) localForm.id = file;
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
        <label>Full Name *</label>
        <input type="text" v-model="localForm.name" required />
      </div>
  
      <div class="form-group">
        <label>Relationship *</label>
        <select v-model="localForm.relationship" required>
          <option value="friend">Friend</option>
          <option value="family">Family</option>
          <option value="colleague">Colleague</option>
        </select>
      </div>
  
      <div class="form-group">
        <label>Email Address *</label>
        <input type="email" v-model="localForm.email" required />
      </div>
  
      <div class="form-group">
        <label>Phone Number *</label>
        <input type="text" v-model="localForm.phone" required />
      </div>
  
      <div class="form-group">
        <label>Additional Phone Number</label>
        <input type="text" v-model="localForm.additionalPhone" />
      </div>
  
      <h3>Upload a clear photo of your guarantor's ID</h3>
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
  
      <div class="form-group checkbox">
        <input type="checkbox" v-model="localForm.agreement" />
        <label>I certify that all information provided is true.</label>
      </div>
  
      <div class="form-group checkbox">
        <input type="checkbox" v-model="localForm.verificationConsent" />
        <label>I authorize verification of my application information.</label>
      </div>
  
      <p class="privacy-notice">Your information is strictly used for communication with landlords or property managers.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, reactive, watch } from "vue";
  
  const props = defineProps(["title", "form"]);
  const emit = defineEmits(["update:form"]);
  
  const localForm = reactive({
    ...props.form.guarantor,
    additionalPhone: props.form.guarantor?.additionalPhone || null,
    agreement: false,
    verificationConsent: false
  });
  
  const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) localForm.id = file;
  };
  
  watch(localForm, () => {
    emit("update:form", { ...props.form, guarantor: localForm });
  });
  </script>
  