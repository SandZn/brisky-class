'use strict'
require('brisky-core').prototype.inject(require('../'))
const s = require('vigour-state/s')
const test = require('tape')
const render = require('brisky-core/render')
require('./style.css')

test('subscription - any + test - class false', function (t) {
  const state = s({
    todos: {
      1: { text: 'hello 1' },
      2: { text: 'hello 2' }
    }
  })

  const app = render({
    class: 'simple-class',
    todos: {
      class: true,
      tag: 'ul',
      $: 'todos.$any',
      child: {
        tag: 'li',
        text: { $: 'text' },
        class: {
          val: 'someclass',
          striketrough: { $: 'done' },
          party: {
            $: 'text.$test',
            $test: {
              val (val) {
                return val.compute().indexOf('party') !== -1
              }
            },
            $transform: val => val || false
          }
        }
      }
    }
  }, state)

  state.todos[1].set({ text: 'party boys' })

  global.s = state

  document.body.appendChild(app)
})
