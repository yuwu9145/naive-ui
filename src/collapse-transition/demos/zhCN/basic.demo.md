# 基本用法

```html
<n-space vertical>
  <n-switch v-model:value="collapsed">
    <template #checked>展开</template>
    <template #unchecked>折叠</template>
  </n-switch>
  <n-collapse-transition :collapsed="collapsed">
    感知度，方法论，组合拳，引爆点，点线面，精细化，差异化，平台化，结构化，影响力，耦合性，便捷性，一致性，端到端，短平快，护城河，体验感，颗粒度
  </n-collapse-transition>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      collapsed: ref(true)
    }
  }
})
```
