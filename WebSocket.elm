module WebSocket where

import Task exposing (Task)
import Native.WebSocket

type WebSocket = WebSocket

create : String -> Task x WebSocket
create =
  Native.WebSocket.create

listen : Signal.Address String -> WebSocket -> Task x ()
listen =
  Native.WebSocket.listen

send : String -> WebSocket -> Task x ()
send =
  Native.WebSocket.send

connected : Signal.Address Bool -> WebSocket -> Task x ()
connected =
  Native.WebSocket.connected
