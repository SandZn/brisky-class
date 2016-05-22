'use strict'
const getParent = require('brisky-core/lib/render/dom/parent')

exports.properties = {
  class: {
    type: 'group',
    storeContextKey: true,
    render: {
      static (target, node) {
        setClassName(target.cParent().key, target.storeStatic(node), target, node)
      },
      state (target, state, type, stamp, subs, tree, id, pid) {
        setClassName(
          key(target, id),
          target.storeState(state, type, stamp, subs, tree, pid + 'class', pid),
          target,
          getParent(type, stamp, subs, tree, pid)
        )
      }
    },
    Child: {
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

function setClassName (key, val, target, node) {
  if (val) {
    node.className = key && (key !== val && isNaN(key)) ? key + ' ' + val : val
  } else if (key && isNaN(key)) {
    node.className = key
  } else if (node.className) {
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
    return target.cParent().key
  }
}

exports.class = ''
