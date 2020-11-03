# v-dollar

jQuery-like Vue Reactivity API `well-typed!`

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
const inc = () => counter.value += 1

$(counter, (value) => console.log(value), { flush: 'post' })
```

w/o `v-dollar`

```ts
import { ref, computed, unref, watch } from 'vue'

const counter = ref(0)
const doubled = computed(() => counter.value * 2)

const reset = () => counter.value = 0
const double = () => counter.value = unref(doubled)
const inc = () => counter.value += 1

watch(counter, (value) => console.log(value), { flush: 'post' })
```

## Why?

FUN.

It's just a toy, don't take it seriously. But yeah, you can use it in prod if you like :p

## License

MIT
