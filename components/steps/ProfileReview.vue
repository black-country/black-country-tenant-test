<template>
    <div class="step">
      <h2>{{ title }}</h2>
      <div class="form-group">
        <label>First Name</label>
        <input type="text" v-model="localForm.firstName" required />
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" v-model="localForm.lastName" required />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="localForm.email" required />
      </div>
      <div class="form-group">
        <label>Phone Number</label>
        <input type="text" v-model="localForm.phoneNumber" required />
      </div>
      <div class="form-group">
        <label>Date of Birth</label>
        <input type="date" v-model="localForm.dateOfBirth" required />
      </div>
      <div class="form-group">
        <label>Gender</label>
        <select v-model="localForm.gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="form-group">
        <label>State of Origin</label>
        <input type="text" v-model="localForm.state" required />
      </div>
      <div class="form-group">
        <label>Local Government (LGA)</label>
        <input type="text" v-model="localForm.lga" required />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, reactive, watch } from "vue";
  
  const props = defineProps(["title", "form"]);
  const emit = defineEmits(["update:form"]);
  
  const localForm = reactive({ ...props.form });
  
  watch(localForm, () => {
    emit("update:form", localForm);
  });
  </script>
  