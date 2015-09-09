Elm.Native.WebSocket = {};
Elm.Native.WebSocket.make = function(localRuntime) {
  localRuntime.Native = localRuntime.Native || {};
  localRuntime.Native.WebSocket = localRuntime.Native.WebSocket || {};
  if (localRuntime.Native.WebSocket.values) {
    return localRuntime.Native.WebSocket.values;
  }

  var Signal = Elm.Native.Signal.make(localRuntime);
  var Task = Elm.Native.Task.make(localRuntime);
  var Utils = Elm.Native.Utils.make(localRuntime);

  function create(url) {
    return Task.asyncFunction(function(callback) {
      var socket = new WebSocket(url);
      socket.onopen = function() {
        callback(Task.succeed(socket));
      };
    });
  }

  function listen(address, socket) {
    return Task.asyncFunction(function(callback) {
      socket.onmessage = function(event) {
        Task.perform(address._0(event.data));
      };
      callback(Task.succeed(Utils.Tuple0));
    });
  }

  function send(message, socket) {
    return Task.asyncFunction(function(callback) {
      if (socket.readyState == WebSocket.OPEN) {
        socket.send(message);
        Task.succeed(Utils.Tuple0);
      } else {
        Task.fail(Utils.Tuple0);
      }
    });
  }

  localRuntime.Native.WebSocket.values = {
    create: create,
    listen: F2(listen),
    send: F2(send)
  };

  return localRuntime.Native.WebSocket.values;
}
