# v-dollar

jQuery-like Vue Reactivity API , it's well-typed!

```bash
npm i v-dollar
```

`ref` => `$`<br>
`computed` => `$`<br>
`watch` => `$`<br>
`unref` => `$`<br>
`set` => `$`<br>

You are welcome.

## Usages

with `v-dollar`

```ts
import { $ } from 'v-dollar'

const counter = $(0)
const doubled = $(() => $(counter) * 2)

const reset = () => $(counter, 0)
const double = () => $(counter, doubled)

$(counter, (value) => console.log(value), { flush: 'post' })
```

w/o `v-dollar`

```ts
import { ref, computed, unref, watch } from 'vue'

const counter = ref(0)
const doubled = computed(() => counter.value * 2)

const reset = () => counter.value = 0
const double = () => counter.value = unref(doubled)

watch(counter, (value) => console.log(value), { flush: 'post' })
```

## Why?

FUN.

Don't take it seriously, it's just a toy. But yeah, you can use it in prod if you like, we have nearly 100% test coverage :p

## License

MIT
