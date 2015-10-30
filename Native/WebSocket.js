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

  function createToHost(port) {
    var socket = window.socket;
    var url = "ws://".concat(window.location.hostname).concat(":");
    url = url.concat(port);
    return Task.asyncFunction(function(callback) {
      if (typeof socket === 'undefined') {
        socket = new WebSocket(url);
        socket.onopen = function() {
          callback(Task.succeed(socket));
        }
        window.socket = socket;
      } else {
        callback(Task.succeed(socket));
      }
    });
  }

  function create(url) {
    var socket = window.socket;
    return Task.asyncFunction(function(callback) {
      if (typeof socket === 'undefined') {
        socket = new WebSocket(url);
        socket.onopen = function() {
          callback(Task.succeed(socket));
        }
        window.socket = socket;
      } else {
        callback(Task.succeed(socket));
      }
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
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
        callback(Task.succeed(Utils.Tuple0));
      } else {
        callback(Task.fail(Utils.Tuple0));
      }
    });
  }

  function connected(address, socket) {
    return Task.asyncFunction(function(callback) {
      if (socket.readyState === WebSocket.OPEN) {
        Task.perform(address._0(true));
      } else {
        Task.perform(address._0(false));
      }
      socket.onopen = function() {
        Task.perform(address._0(true));
      };
      socket.onclose = function() {
        Task.perform(address._0(false));
      };
      callback(Task.succeed(Utils.Tuple0));
    });
  }

  localRuntime.Native.WebSocket.values = {
    createToHost: createToHost,
    create: create,
    listen: F2(listen),
    send: F2(send),
    connected: F2(connected)
  };

  return localRuntime.Native.WebSocket.values;
}
