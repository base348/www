<template>
  <div>
    <MenuTable v-if="project" :project="project"/>
    <Projects v-else/>
  </div>
</template>

<script setup lang="ts">
import Projects from "@/views/menu/components/Projects.vue";
import MenuTable from "@/views/menu/components/MenuTable.vue";

const route = useRoute();
const project = computed(() => {
  const code = route.query.project;
  if (Array.isArray(code)) {
    // 过滤掉 null/undefined/空字符串，取第一个非空值
    return code
      .filter((item): item is string => typeof item === 'string' && item.trim() !== '')
      .map(str => str.trim())[0] || undefined; // 没找到返回 null
  } else if (typeof code === 'string' && code.trim() !== '') {
    return code.trim();
  } else {
    return undefined;
  }
});

</script>
