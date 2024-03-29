import { Request, Response } from 'express'

import { JSON } from 'Types/JSON'
import { z } from 'zod'

export type IControllerRequest<Controller extends BaseController<any>> = IRequest<
	z.infer<Controller['body']>,
	z.infer<Controller['query']>,
	z.infer<Controller['params']>,
	z.infer<Controller['cookies']>
>

export interface IRequest<
	Body extends Record<string, any> = {},
	Query extends Record<string, any> = {},
	Params extends Record<string, any> = {},
	Cookies extends Record<string, any> = {},
> {
	body: Body
	query: Query
	params: Params
	cookies: Cookies
}

export type IControllerResponse = Response<JSON>

const emptyZodObject = z.object({})

abstract class BaseController<T extends Record<string, any> = {}> {
	public abstract index(
		data: T,
		request: IControllerRequest<any>,
		response: IControllerResponse,
	): void

	public get body() {
		return emptyZodObject
	}

	public get query() {
		return emptyZodObject
	}

	public get params() {
		return emptyZodObject
	}

	public get cookies() {
		return emptyZodObject
	}
}

export default BaseController
