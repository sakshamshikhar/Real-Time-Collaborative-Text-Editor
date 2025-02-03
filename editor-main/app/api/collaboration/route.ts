import { NextApiRequest } from 'next'
import { Server } from 'ws'
import { setupWSConnection } from 'y-websocket/bin/utils'

const wss = new Server({ noServer: true })

export default function handler(req: NextApiRequest, res: any) {
  if (!res.socket.server.wss) {
    res.socket.server.wss = wss
    res.socket.server.on('upgrade', (request: any, socket: any, head: any) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request)
      })
    })
  }

  wss.on('connection', (ws: any, req: any) => {
    setupWSConnection(ws, req)
  })

  res.end()
}

