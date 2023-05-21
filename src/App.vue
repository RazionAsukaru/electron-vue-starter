<script>
import fs from 'fs'
import pathModule from 'path'

import { app } from '@electron/remote'
import { computed, ref } from 'vue'

import { NSpace, NButton } from 'naive-ui'

const formatSize = size => {
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  )
}

export default {
  name: 'App',
  components: { NSpace, NButton },
  setup() {
    const path = ref(app.getAppPath())
    console.log(path)
    const files = computed(() => {
      const fileNames = fs.readdirSync(path.value)
      return fileNames
        .map(file => {
          const stats = fs.statSync(pathModule.join(path.value, file))
          return {
            name: file,
            size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
            directory: stats.isDirectory()
          }
        })
        .sort((a, b) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name)
          }
          return a.directory ? -1 : 1
        })
    })

    const back = () => {
      path.value = pathModule.dirname(path.value)
    }
    const open = folder => {
      path.value = pathModule.join(path.value, folder)
    }

    const searchString = ref('')
    const filteredFiles = computed(() => {
      return searchString.value
        ? files.value.filter(s => s.name.startsWith(searchString.value))
        : files.value
    })

    return {
      path,

      open,
      back,

      files,
      searchString,
      filteredFiles
    }
  }
}
</script>

<template>
  <div class="container mt-2">
    <n-space>
      <n-button>Default</n-button>
      <n-button type="tertiary">
        Tertiary
      </n-button>
      <n-button type="primary">
        Primary
      </n-button>
      <n-button type="info">
        Info
      </n-button>
      <n-button type="success">
        Success
      </n-button>
      <n-button type="warning">
        Warning
      </n-button>
      <n-button type="error">
        Error
      </n-button>
    </n-space>
  </div>
</template>
