function EventEmitter () {
  this.listeners = {}
}

EventEmitter.prototype.on = EventEmitter.prototype.addHandler = function (event, handler) {
  this.listeners = this.listeners || {}
  if (typeof handler !== 'function') {
    throw TypeError('Handler is not a function')
  }
  this.listeners[event] = this.listeners[event] || []
  this.listeners[event].push(handler)
  return this
}

EventEmitter.prototype.once = function (event, handler) {
  this.listeners = this.listeners || {}
  if (typeof handler !== 'function') {
    throw TypeError('Handler is not a function')
  }

  let r = function () {
    this.removeHandler(event, handler)
    this.removeHandler(event, r)
    if (this.listeners[event].length === 0) {
      delete this.listeners[event]
    }
  }
  this.listeners[event] = this.listeners[event] || []
  this.listeners[event].push(handler)
  this.on(event, r)
  return this
}

EventEmitter.prototype.emit = function (event) {
  if (!this.listeners[event]) {
    return false
  }
  let args = [].slice.call(arguments, 1)
  let handlers = this.listeners[event]
  for (var i = 0; i < handlers.length; i++) {
    handlers[i].apply(this, args)
  }
  return true
}

EventEmitter.prototype.off = EventEmitter.prototype.removeHandler = function (event, handler) {
  if (!this.listeners || !this.listeners[event]) {
    return this
  }
  if (typeof handler !== 'function') {
    throw TypeError('Handler is not a function')
  }

  let handlers = this.listeners[event]
  for (var i = 0; i < handlers.length; i++) {
    if (handlers[i] === handler) {
      handlers.splice(i, 1)
      if (this.listeners[event].length === 0) {
        delete this.listeners[event]
      }
      return this
    }
  }
  return this
}

EventEmitter.prototype.removeAllHandlers = function (event) {
  if (!this.listeners || !this.listeners[event]) {
    return this
  }
  delete this.listeners[event]
  return this
}

module.exports = EventEmitter
EventEmitter.EventEmitter = EventEmitter
