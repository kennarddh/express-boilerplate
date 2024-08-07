import Cors from 'Middlewares/Cors'
import LogHttpRequest from 'Middlewares/LogHttpRequest'

import Router from 'Routes'

import 'Database/index'

import { ExpressInstance } from './Internals'

const Instance = new ExpressInstance({ strict: true })

// Middleware
Instance.useMiddlewares(new Cors())
Instance.useMiddlewares(new LogHttpRequest())

Instance.useRouters(Router)

export default Instance
