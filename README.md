# event-emitter

A simple JS event emitter module

## Usage

`const emitter = require('./path/to/eventemitter.js')`

`const eventEmitter = new emitter.EventEmitter()`

Instantiates an emitter with a listeners object.

### Methods

`eventEmitter.addHandler(event, handler)`

Registers the given handler for the given event.  Returns emitter.
Caution:  it is possible to add multiple identical listeners (see notes below about removal).

`eventEmitter.on(event, handler)`

Short alternative syntax for addHandler.

`eventEmitter.once(event, handler)`

Registers a handler function that will be called at most one time.  Returns emitter.

`eventEmitter.emit(event, [args])`

Executes each of the handler functions for the given event in the order they were registered, using additional optional parameters if supplied.  Returns true if the event has registered handlers, false if not.

`eventEmitter.removeHandler(event, handler)`

If the given handler was previously registered for the given event, removes the handler and returns emitter.  If the given handler was never registered, simply returns emitter unchanged.
If there are no remaining handlers for the event, the event and its handler array will be removed from the listeners object.
Caution:  if multiple identical listeners have been added, this method will remove only one and must be called again for each separate instance to remove it.

`eventEmitter.off(event, handler)`

Short alternative syntax for removeHandler.

`eventEmitter.removeAllHandlers(event)`

Removes the given event and its entire handler array from the listeners object.
