# brisky-class
<!-- VDOC.badges travis; standard; npm; coveralls -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/brisky-class.svg?branch=master)](https://travis-ci.org/vigour-io/brisky-class)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/brisky-class.svg)](https://badge.fury.io/js/brisky-class)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/brisky-class/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/brisky-class?branch=master)

<!-- VDOC END -->
**basic**
```javascript
  const render = require('brisky/render')

  const app = render({
    class: 'app' // → add class 'app'
  })

  document.body.appendChild(app)
```

**nested**
```javascript
  const render = require('brisky/render')
  const s = require('vigour-state/s')

  const state = s({
    class: true
  })

  const app = render({
    class: {
      val: 'css-class', // → add class "simple-class"
      'state-class': { $: 'class' }, // → add class "state-class" (state.class is true)
      'simple-class': true, //  → add class "simple-class"
      'other-class': false // → will remove class "other-class" if it's defined
    }
  }, state)

  state.class.set(false) // → remove class "state-class"
  state.class.set('bla') // → adds class "bla"
  document.body.appendChild(app)
```

**key**
```javascript
  const render = require('brisky/render')

  const app = render({
    field: {
      class: true  // → add class "field"
    },
    other: {
      class: {
        useKey: true, // property forces use of a key
        val: 'some-class' // → className "other some-class"
      }
    }
  })

  document.body.appendChild(app)
```
