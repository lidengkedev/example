# STORE

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your Vuex Store files.
Vuex Store option is implemented in the Nuxt.js framework.

Creating a file in this directory automatically activates the option in the framework.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/vuex-store).

## Vuex 状态树

对于每个大项目来说，使用状态树 (store) 管理状态 (state) 十分有必要。这就是为什么 Nuxt.js 内核实现了[ Vuex](https://github.com/vuejs/vuex)。

### 使用状态树

Nuxt.js 会尝试找到应用根目录下的 store 目录，如果该目录存在，它将做以下的事情：

1.引用 vuex 模块
2.将 vuex 模块 加到 vendors 构建配置中去
3.设置 Vue 根实例的 store 配置项

Nuxt.js 支持两种使用 store 的方式，你可以择一使用：

- 普通方式： store/index.js 返回一个 Vuex.Store 实例
- 模块方式： store 目录下的每个 .js 文件会被转换成为状态树指定命名的子模块 （当然，index 是根模块）

> 普通方式

使用普通方式的状态树，需要添加 store/index.js 文件，并对外暴露一个 Vuex.Store 实例：

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    counter: 0
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  }
})

export default store
```

Nuxt.js 内置引用了 vuex 模块，所以不需要额外安装。

现在我们可以在组件里面通过 this.$store 来使用状态树：

```html
<template>
  <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
</template>
```

> 模块方式

状态树还可以拆分成为模块，store 目录下的每个 .js 文件会被转换成为状态树指定命名的子模块

使用状态树模块化的方式，store/index.js 不需要返回 Vuex.Store 实例，而应该直接将 state、mutations 和 actions 暴露出来：

```javascript
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}
```

其他的模块文件也需要采用类似的方式，如 store/todos.js 文件：

```javascript
export const state = () => ({
  list: []
})

export const mutations = {
  add (state, text) {
    state.list.push({
      text: text,
      done: false
    })
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}
```

最终的状态树大概如下：

```javascript
new Vuex.Store({
  state: { counter: 0 },
  mutations: {
    increment (state) {
      state.counter++
    }
  },
  modules: {
    todos: {
      state: {
        list: []
      },
      mutations: {
        add (state, { text }) {
          state.list.push({
            text,
            done: false
          })
        },
        remove (state, { todo }) {
          state.list.splice(state.list.indexOf(todo), 1)
        },
        toggle (state, { todo }) {
          todo.done = !todo.done
        }
      }
    }
  }
})
```

在页面组件 pages/todos.vue， 可以像下面这样使用 todos 模块：

```html
<template>
  <ul>
    <li v-for="todo in todos">
      <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    todos () { return this.$store.state.todos.list }
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
```