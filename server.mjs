import Fastify from 'fastify'
import * as sensible from '@fastify/sensible'
import {lookup} from './main.mjs'

const fastify = Fastify({
  logger: true
})


fastify.register(sensible)

fastify.get('/async-return', async (req, reply) => {
    const look = await lookup('multichat:cNhuxD2vE5v3os11OTt9')
    return look
  })
  
  fastify.listen({ port: 3000 })