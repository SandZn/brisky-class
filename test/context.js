'use strict'
const test = require('tape')
const render = require('brisky-core/render')
const parse = require('parse-element')
const strip = require('vigour-util/strip/formatting')
require('brisky-core').prototype.inject(require('../'))

test('context - static class name', function (t) {
  const types = {
    steps: {
      class: true,
      one: { text: 1 },
      two: { text: 2 },
      three: { text: 3 }
    }
  }

  const page1 = {
    steps: {
      type: 'steps',
      one: { class: 'active' }
    }
  }

  const page2 = {
    steps: {
      type: 'steps',
      two: { class: 'active' }
    }
  }

  const app = render({
    types,
    page1,
    page2
  })

  t.same(
    parse(app),
    strip(`
      <div>
        <div>
          <div class="steps">
            <div class="active">1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>
        <div>
          <div class="steps">
          <div>1</div>
          <div class="active">2</div>
          <div>3</div>
          </div>
        </div>
      </div>
    `),
    'correct inheritance'
  )

  t.end()
})

test('basic - keys as class name', function (t) {
  const elem = render({
    types: {
      elem: {
        class: {
          val: true,
          thing: {
            $: 'simpleClass'
          }
        }
      }
    },
    elem1: { type: 'elem' },
    elem2: { type: 'elem' }
  }, {
    simpleClass: 'simple-class'
  })
  t.equals(elem.childNodes[0].className, 'elem1 simple-class', 'context 1 correct key')
  t.equals(elem.childNodes[1].className, 'elem2 simple-class', 'context 2 correct key')
  t.end()
})
