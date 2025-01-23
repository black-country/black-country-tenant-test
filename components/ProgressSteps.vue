<!-- <template>
  <div class="flex items-center justify-between w-full max-w-4xl mx-auto px-4">
    <template v-for="(stage, index) in stagesArray" :key="index">
      <div class="flex-1 relative">
        <div class="flex items-center">
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center shadow-sm',
              stage.status === 'done'
                ? 'bg-green-600 text-white'
                : stage.status === 'active'
                ? 'bg-green-600 text-white'
                : 'bg-gray-50 text-gray-500'
            ]"
          >
            <template v-if="stage.status === 'done'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            <template v-else>
              {{ index + 1 }}
            </template>
          </div>

          <div
            v-if="index < stagesArray.length - 1"
            class="flex-1 px-2 border-[0.5px] border-dotted"
            :class="[
              stage.status === 'done'
                ? 'border-green-600 font-medium'
                : stage.status === 'active'
                ? 'border-green-600 font-medium'
                : 'border-gray-600'
            ]"
          >
            <div class="h-[2px] flex items-center">
              <div class="w-full h-full relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full h-[2px] flex justify-between items-center">
                    <template v-for="n in 15" :key="n">
                      <div class="w-[2px] h-[2px] rounded-full bg-gray-300"></div>
                    </template>
                  </div>
                </div>

                <div
                  class="absolute inset-0 flex items-center transition-all duration-300 overflow-hidden"
                  :style="{ width: stage.status === 'done' ? '100%' : '0%' }"
                >
                  <div class="w-full h-[2px] flex justify-between items-center">
                    <template v-for="n in 15" :key="n">
                      <div class="w-[2px] h-[2px] rounded-full bg-green-600"></div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="">
          <span
            class="absolute left-0 text-center mt-2 text-sm whitespace-nowrap"
            :class="[
              stage.status === 'done'
                ? 'text-green-600 font-medium'
                : stage.status === 'active'
                ? 'text-green-600 font-medium'
                : 'text-gray-600'
            ]"
          >
            {{ stage.label }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, watch } from 'vue';

interface Props {
  rentalObj: Record<string, any>;
}

const props = defineProps<Props>();

// Extracting stages dynamically
const stagesArray = computed(() => {
  const stages = props.rentalObj.stages || {};
  return Object.values(stages);
});
</script> -->

<template>
  <div class="flex items-center justify-between w-full max-w-4xl mx-auto px-4">
    <template v-for="(stage, index) in stagesArray" :key="index">
      <div class="flex-1 relative flex items-center">
        <!-- Circular Step -->
        <div class="flex flex-col items-center">
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center shadow-sm',
              stage.status === 'done'
                ? 'bg-green-600 text-white'
                : stage.status === 'active'
                ? 'bg-green-600 text-white'
                : 'bg-gray-50 text-gray-500',
            ]"
          >
            <template v-if="stage.status === 'done'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            <template v-else>
              {{ index + 1 }}
            </template>
          </div>

          <span
            class="mt-2 text-xs text-center whitespace-nowrap"
            :class="[
              stage.status === 'done'
                ? 'text-green-600 font-medium'
                : stage.status === 'active'
                ? 'text-green-600 font-medium'
                : 'text-gray-600',
            ]"
          >
            {{ stage.label }}
          </span>
        </div>

        <!-- Dotted Connector Line -->
        <!-- <div
          v-if="index < stagesArray.length - 1"
          class="border-t-4 -mt-6 w-full border-dotted"
          :class="[
            stage.status === 'done'
              ? 'border-green-600'
              : stage.status === 'active'
              ? 'border-green-600'
              : 'border-gray-300'
          ]"
          style="top: 50%; left: calc(100% + 8px); width: calc(100% - 16px); transform: translateY(-50%);"
        ></div> -->
        <div
          v-if="index < stagesArray.length - 1"
          class="custom-dotted-border p-0.5 border-t-4 -mt-6 w-full"
          :class="[
            stage.status === 'done'
              ? 'border-green-300'
              : stage.status === 'active'
              ? 'border-green-600'
              : 'border-gray-300',
          ]"
          style="
            top: 50%;
            left: calc(100% + 8px);
            width: calc(100% - 16px);
            transform: translateY(-50%);
          "
        ></div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

interface Props {
  rentalObj: Record<string, any>;
}

const props = defineProps<Props>();

// Extracting stages dynamically
const stagesArray = computed(() => {
  const stages = props.rentalObj.stages || {};
  return Object.values(stages);
});
</script>

<style scoped>
.custom-dotted-border {
  border: none; /* Remove default border */
  height: 1; /* Ensures height doesn't affect layout */
  background-image: repeating-linear-gradient(
    to right,
    currentColor,
    currentColor 4px,
    /* Dot size */ transparent 4px,
    /* Gap size */ transparent 8px
  );
  background-position: center;
  background-size: 100% 2px; /* Adjust vertical size of the dots */
}
</style>
