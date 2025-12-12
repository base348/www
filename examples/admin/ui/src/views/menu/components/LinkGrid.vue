<template>
  <div
    class="grid gap-4"
    :class="{
      'grid-cols-1': columns === 1,
      'grid-cols-2': columns === 2,
      'grid-cols-3': columns === 3,
      'grid-cols-4': columns === 4,
      'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4': columns === 0, // 自适应列数（响应式）
    }"
  >
    <div
      v-for="(link, index) in props.links"
      :key="index"
      class="py-1"
    >
      <RouterLink
        :to="link.to!"
        class="text-md text-primary hover:text-primary cursor-pointer hover:underline"
      >
        {{ link.text }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">

interface LinkItem {
  text: string
  to: { path?: string; name?: string; params?: any; query?: any }
}

const props = defineProps<{
  links: LinkItem[]
  columns?: number
}>()
</script>

<style scoped>
</style>
