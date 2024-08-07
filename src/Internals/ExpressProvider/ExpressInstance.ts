import express, { NextFunction, Request, Response } from 'express'

import { Server } from 'http'

import compression from 'compression'

import cookieParser from 'cookie-parser'

import helmet from 'helmet'

import {
	BaseMiddleware,
	ExpressRequest,
	ExpressResponse,
	ExpressRouter,
	ExtensionsRegistry,
	IListenOptions,
	InvalidExtensionError,
	NoInputMiddleware,
} from 'Internals'

import Logger from 'Utils/Logger/Logger'

import ParseJson from './Middlewares/ParseJson'
import ParseUrlencoded from './Middlewares/ParseUrlencoded'

export interface InstanceConstructorOptions<Strict extends boolean = true> {
	strict: Strict
}

class ExpressInstance<Strict extends boolean> {
	protected _cachedExtensionsProxy: ExpressFramework.ExpressInstance<Strict> | null = null

	protected readonly isStrict: Strict
	protected readonly express: ReturnType<typeof express>
	protected _server: Server | null = null

	constructor(options: InstanceConstructorOptions<Strict>) {
		this.isStrict = options.strict

		this.express = express()

		// Only for internal use.
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
		;(this.express as any).__EXPRESS_FRAMEWORK__ = {
			instance: this,
		}

		// Settings
		this.express.disable('x-powered-by')

		this.express.use(compression())
		this.express.use(helmet())

		this.express.use(ParseUrlencoded)
		this.express.use(ParseJson)

		this.express.use(cookieParser())
	}
	/**
	 * User-defined extensions method.
	 * Register by using `ExtensionsRegistry.registerExpressInstanceExtension`.
	 */
	public get extensions(): ExpressFramework.ExpressInstance<Strict> {
		if (this._cachedExtensionsProxy === null)
			this._cachedExtensionsProxy = new Proxy(
				{},
				{
					get: (_, property, __) => {
						const extensionHandler =
							ExtensionsRegistry.getExpressInstanceExtension(property)

						if (extensionHandler === undefined)
							throw new InvalidExtensionError(
								`Use of unregistered extension "${property.toString()}".`,
							)

						// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
						return (...args: any[]) => extensionHandler(this, ...args)
					},
				},
			) as ExpressFramework.ExpressInstance<Strict>

		return this._cachedExtensionsProxy
	}

	public get server() {
		return this._server
	}

	public get isListening(): boolean {
		return this._server?.listening ?? false
	}

	/**
	 * Must be called last after all router is registered
	 *
	 * Doesn't work until Express 5 because Express 4.x won't catch uncaught exception in promise.
	 */
	public addErrorHandler() {
		this.express.use((error: Error, _: Request, response: Response, __: NextFunction): void => {
			Logger.error('Error occured.', error)

			response.status(500).json({ errors: { others: ['Internal Server Error'] }, data: {} })
		})
	}

	public listen(options: IListenOptions): Promise<void> {
		if (this._server !== null) throw new Error('Server already running')

		return new Promise(resolve => {
			// https://stackoverflow.com/a/69324331/14813577
			this._server = this.express.listen(
				options.port ?? 0,
				options.host ?? '127.0.0.1',
				options.backlog ?? 511,
				resolve,
			)
		})
	}

	public close(): Promise<void> {
		if (this._server === null) throw new Error('Server is not running')

		return new Promise((resolve, reject) => {
			this._server?.close(error => {
				if (error) reject(error)
				else resolve()
			})
		})
	}

	public useRouters(
		path: string,
		...routers: [ExpressRouter<Strict>, ...ExpressRouter<Strict>[]]
	): this
	public useRouters(...routers: [ExpressRouter<Strict>, ...ExpressRouter<Strict>[]]): this
	public useRouters(
		...routersAndPath: [string | ExpressRouter<Strict>, ...(string | ExpressRouter<Strict>)[]]
	): this {
		const possiblyPath = routersAndPath[0]
		const path = typeof possiblyPath === 'string' ? possiblyPath : null

		const routers = (
			path === null ? routersAndPath : routersAndPath.filter((_, index) => index !== 0)
		) as ExpressRouter[]

		routers.forEach(router => {
			if (path === null) this.express.use(router.expressRouter)
			else this.express.use(path, router.expressRouter)
		})

		return this
	}

	/**
	 * For middlewares without any input or output
	 */
	public useMiddlewares(
		path: string,
		...middlewares: [NoInputMiddleware, ...NoInputMiddleware[]]
	): this

	/**
	 * For middlewares without any input or output
	 */
	public useMiddlewares(...middlewares: [NoInputMiddleware, ...NoInputMiddleware[]]): this

	public useMiddlewares(
		...middlewaresAndPath: [string | NoInputMiddleware, ...(string | NoInputMiddleware)[]]
	): this {
		const possiblyPath = middlewaresAndPath[0]
		const path = typeof possiblyPath === 'string' ? possiblyPath : null

		const middlewares = (
			path === null
				? middlewaresAndPath
				: middlewaresAndPath.filter((_, index) => index !== 0)
		) as BaseMiddleware[]

		middlewares.forEach(middleware => {
			const handler = (request: Request, response: Response, next: NextFunction) => {
				const newRequest = new ExpressRequest(request)
				const newResponse = new ExpressResponse(response)

				middleware
					.index({}, newRequest, newResponse)
					.then(() => {
						next()
					})
					.catch((error: unknown) => {
						Logger.error('Unknown middleware error occured', error)
					})
			}

			if (path === null) this.express.use(handler)
			else this.express.use(path, handler)
		})

		return this
	}
}

export default ExpressInstance
