<template>
  <div class="p-6 bg-[var(--el-bg-color)] border-2 border-[var(--el-border-color-light)] mx-2 my-3">
    <h2 class="text-xl font-bold mt-0 mb-4">目录配置</h2>
    <LinkGrid
      class="ml-4"
      :links="resourceLinks"
      :columns="0"
      underline-always
    />
  </div>
</template>

<script setup lang="ts">
import LinkGrid from './LinkGrid.vue'
import {getProjectsAPi} from "@/api/project.api";

const resourceLinks = ref([]);

onMounted(() => {
  getProjectsAPi().then((data) => {
    resourceLinks.value = data.map((item: any) => {
      return {
        text: item.name,
        to: {
          name: "Menus",
          query: {
            project: item.menuCategory,
          }
        },
      }
    })
    console.log(resourceLinks.value)
  })
})

</script>
