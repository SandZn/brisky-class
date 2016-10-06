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
      tag: 'ul',
      $: 'todos.$any',
      child: {
        tag: 'li',
        text: { $: 'text' },
        class: {
          val: 'someclass',
          party: { $: 'party' }
          // test
        }
      }
    }
  }, state)

  document.body.appendChild(app)

})
