<template>
    <div class="step">
      <h2>{{ title }}</h2>
      <div class="form-group">
        <label>Can you provide references from previous landlords?</label>
        <!-- <input type="text" v-model="localForm.references" required /> -->
      </div>
      <div class="form-group">
        <label>Do you have any pets? (Specify type and breed)</label>
        <input type="text" v-model="localForm.pets" />
      </div>
      <div class="form-group">
        <label>Preferred move-in date and lease term?</label>
        <input type="date" v-model="localForm.moveInDate" required />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, reactive, watch } from "vue";
  
  const props = defineProps(["title", "form"]);
  const emit = defineEmits(["update:form"]);
  
  const localForm = reactive({ ...props.form.preScreening });
  
  watch(localForm, () => {
    emit("update:form", { ...props.form, preScreening: localForm });
  });
  </script>
  