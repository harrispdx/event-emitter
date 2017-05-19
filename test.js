const tap = require('tap')

tap.test('adding and removing handlers', function (t) {
  const emitter = require('./eventemitter')
  const eventEmitter = new emitter.EventEmitter()

  const test = function () {
    return true
  }
  const exam = function () {
    return true
  }

  eventEmitter.on('click', test)
  eventEmitter.addHandler('click', exam)

  t.equals(eventEmitter.emit('click'), true)

  eventEmitter.off('click', test)
  eventEmitter.removeHandler('click', exam)

  t.equals(eventEmitter.emit('click'), false)

  eventEmitter.once('click', test)
  t.equals(eventEmitter.emit('click'), true)
  t.equals(eventEmitter.emit('click'), false)

  eventEmitter.on('click', test)
  eventEmitter.addHandler('click', exam)

  t.equals(eventEmitter.emit('click'), true)

  eventEmitter.removeAllHandlers('click')

  t.equals(eventEmitter.emit('click'), false)

  t.equals(eventEmitter.off('notAnEvent', test), eventEmitter)

  t.end()
})

tap.test('trying to do wrong things', function (t) {
  const emitter = require('./eventemitter')
  const eventEmitter = new emitter.EventEmitter()

  t.throws(function () {
    eventEmitter.on('eventName', 'not a function')
  }, new TypeError('Handler is not a function'))

  t.throws(function () {
    eventEmitter.once('eventName', 'not a function')
  }, new TypeError('Handler is not a function'))

  t.end()
})

tap.test('arguments', function (t) {
  const emitter = require('./eventemitter')
  const eventEmitter = new emitter.EventEmitter()

  t.plan(3)

  let inputTest = function (a, b, c) {
    t.equals(a, 1)
    t.equals(b, 2)
    t.equals(c, 3)
  }

  eventEmitter.on('click', inputTest)
  eventEmitter.emit('click', 1, 2, 3)

  t.end()
})
