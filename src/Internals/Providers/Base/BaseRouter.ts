import BaseController from '../../BaseController'
import {
	MiddlewareArray,
	NoInputMiddleware,
	ValidateController,
	ValidateMiddlewares,
} from '../../Types'

export interface ParsingInput {
	body: unknown
	query: unknown
	params: unknown
	cookies: unknown
}

abstract class BaseRouter {
	public abstract useRouters(path: string, ...routers: [BaseRouter, ...BaseRouter[]]): this
	public abstract useRouters(...routers: [BaseRouter, ...BaseRouter[]]): this

	/**
	 * For middlewares without any input or output
	 */
	public abstract useMiddlewares(
		path: string,
		...middlewares: [NoInputMiddleware, ...NoInputMiddleware[]]
	): this

	/**
	 * For middlewares without any input or output
	 */
	public abstract useMiddlewares(
		...middlewares: [NoInputMiddleware, ...NoInputMiddleware[]]
	): this

	public abstract get<
		Controller extends BaseController<any, any, any>,
		Middlewares extends MiddlewareArray,
	>(
		path: string,
		middlewares: Middlewares & ValidateMiddlewares<Controller, Middlewares>,
		controller: Controller & ValidateController<Controller, Middlewares>,
	): this

	public abstract post<
		Controller extends BaseController<any, any, any>,
		Middlewares extends MiddlewareArray,
	>(
		path: string,
		middlewares: Middlewares & ValidateMiddlewares<Controller, Middlewares>,
		controller: Controller & ValidateController<Controller, Middlewares>,
	): this

	public abstract put<
		Controller extends BaseController<any, any, any>,
		Middlewares extends MiddlewareArray,
	>(
		path: string,
		middlewares: Middlewares & ValidateMiddlewares<Controller, Middlewares>,
		controller: Controller & ValidateController<Controller, Middlewares>,
	): this

	public abstract patch<
		Controller extends BaseController<any, any, any>,
		Middlewares extends MiddlewareArray,
	>(
		path: string,
		middlewares: Middlewares & ValidateMiddlewares<Controller, Middlewares>,
		controller: Controller & ValidateController<Controller, Middlewares>,
	): this

	public abstract delete<
		Controller extends BaseController<any, any, any>,
		Middlewares extends MiddlewareArray,
	>(
		path: string,
		middlewares: Middlewares & ValidateMiddlewares<Controller, Middlewares>,
		controller: Controller & ValidateController<Controller, Middlewares>,
	): this

	public abstract options<
		Controller extends BaseController<any, any, any>,
		Middlewares extends MiddlewareArray,
	>(
		path: string,
		middlewares: Middlewares & ValidateMiddlewares<Controller, Middlewares>,
		controller: Controller & ValidateController<Controller, Middlewares>,
	): this

	public abstract all<
		Controller extends BaseController<any, any, any>,
		Middlewares extends MiddlewareArray,
	>(
		path: string,
		middlewares: Middlewares & ValidateMiddlewares<Controller, Middlewares>,
		controller: Controller & ValidateController<Controller, Middlewares>,
	): this

	async parseData(controller: BaseController<any, any, any>, parsingData: ParsingInput) {
		return {
			body: await controller.body.safeParseAsync(parsingData.body),
			query: await controller.query.safeParseAsync(parsingData.query),
			params: await controller.params.safeParseAsync(parsingData.params),
			cookies: await controller.cookies.safeParseAsync(parsingData.cookies),
		}
	}
}

export default BaseRouter
