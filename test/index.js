'use strict'
require('brisky-core').prototype.inject(require('../'))

const test = require('tape')
const render = require('brisky-core/render')

test('static class name', function (t) {
  var elem
  t.plan(5)

  elem = render({
    class: 'simple-class'
  })

  t.equals(elem.className, 'simple-class', 'simple value')

  elem = render({
    class: {
      'simple-class': true
    }
  })

  t.equals(elem.className, 'simple-class', 'single field: true')

  elem = render({
    class: {
      'simple-class': false
    }
  })

  t.equals(elem.className, '', 'single field: false')

  elem = render({
    class: {
      simpleString: 'simple-string'
    }
  })

  t.equals(elem.className, 'simple-string', 'single string')

  elem = render({
    class: {
      val: 'simple-value',
      'simple-class': true,
      'not-this': false,
      simpleString: 'simple-string'
    }
  })

  t.equals(elem.className, 'simple-value simple-class simple-string', 'mixed')
})

test('state driven class name', function (t) {
  var elem
  t.plan(4)

  elem = render({
    class: {
      $: 'simpleClass'
    }
  }, {
    simpleClass: 'simple-class'
  })

  t.equals(elem.className, 'simple-class', 'class value from state')

  elem = render({
    // note: needs to be nested => state does not support top subs completely
    $: 'someData',
    class: {
      field: {
        $: 'simpleClass'
      }
    }
  }, {
    someData: {
      simpleClass: 'simple-class'
    }
  })

  t.equals(elem.className, 'simple-class', 'class field from state')

  elem = render({
    // note: needs to be nested => state does not support top subs completely
    $: 'someData',
    class: {
      val: 'simple-value',
      one: {
        $: 'simpleClass'
      },
      field: 'simple-field',
      another: {
        $: 'anotherClass'
      }
    }
  }, {
    someData: {
      simpleClass: 'simple-class',
      anotherClass: 'another-class'
    }
  })

  t.equals(elem.className, 'simple-value another-class simple-class simple-field', 'mixed static with multiple state')

  elem = render({
    $: 'simpleClass',
    class: { $: true }

  }, {
    simpleClass: 'simple-class'
  })

  t.equals(elem.className, 'simple-class', 'subscribe with true')
})

test('keys default class name', function (t) {
  var elem
  t.plan(3)

  elem = render({
    key: 'elem',
    class: {
      $: 'simpleClass'
    }
  }, {
    simpleClass: 'simple-class'
  })

  t.equals(elem.className, 'elem simple-class', 'class includes key')

  elem = render({
    types: {
      elem: {
        class: {
          $: 'simpleClass'
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
})
