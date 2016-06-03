'use strict'
const getParent = require('brisky-core/lib/render/dom/parent')

exports.properties = {
  class: {
    type: 'group',
    storeContextKey: true,
    properties: {
      useKey: true
    },
    render: {
      static (target, node) {
        if (!target.$) {
          var val = target.compute()
          if (val === true || target.useKey) {
            val = typeof val === 'string' ? val + ' ' + target.cParent().key : target.cParent().key
          }
        }
        setClassName(target.storeStatic(val, node), node)
      },
      state (target, state, type, stamp, subs, tree, id, pid) {
        var val = state && target.$ ? target.compute(state) : target.compute()
        if (val === true || target.useKey) {
          val = typeof val === 'string' ? val + ' ' + key(target, id) : key(target, id)
        }
        setClassName(
          target.storeState(val, state, type, stamp, subs, tree, pid + 'class', pid),
          getParent(type, stamp, subs, tree, pid)
        )
      }
    },
    child: {
      define: {
        collect (val, store, id) {
          const _ = store._ || (store._ = {})
          const index = _[id] || (_[id] = store.length + 1)
          store[index] = val ? typeof val === 'string' ? val : this.key : ''
        }
      },
      render: {
        static (target, node, store) {
          target.collect(target.compute(), store, target.uid())
        },
        state (target, state, type, stamp, subs, tree, id, pid) {
          target.collect(target.compute(state), target.getStore(tree, pid + 'class'), id)
        }
      }
    }
  }
}

function setClassName (val, node) {
  if (val) {
    node.className = val
  } else if (node.className) {
    // make a test for this!
    node.removeAttribute('class')
  }
}

function key (target, pid) {
  if (pid[0] === 'c') {
    for (let i = pid.length - 1; i >= 0; i--) {
      if (pid[i] === '-') {
        return pid.slice(1, i)
      }
    }
  } else {
    // never here?
    console.log('hello')
    return target.cParent().key
  }
}
