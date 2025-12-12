<template>
  <div v-if="props.sku" class="flex mr-3">
    <div class="flex-1">
      {{ props.quantity }}
    </div>
    <div class="text-[var(--el-text-color-secondary)]">
      <template v-if="!byVolume">件</template>
      <ForeignKey
        v-else
        :url="materialUrl"
        :code="props.sku"
        field="unit"
      >
        <template #default="{value}">
          <DictText :item-code="value" dict-code="sys_unit"/>
        </template>
      </ForeignKey>
    </div>
  </div>
</template>

<script setup lang="ts">
import { materialUrl } from "@/types/tables/material.table";

const props = defineProps({
  sku: {
    type: String,
    default: "",
  },
  byVolume: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: String,
    default: "",
  }
})
</script>
