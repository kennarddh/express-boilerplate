import express from 'express'

import V1Router from 'Versions/V1/Routes/index.js'

import DocsRouter from './Docs.js'
import NoMatchRouter from './NoMatch.js'

const Router = express.Router()

Router.use('/v1', V1Router)

Router.use('/docs', DocsRouter)

Router.use('*', NoMatchRouter)

export default Router
