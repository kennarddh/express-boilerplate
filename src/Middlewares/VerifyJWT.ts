import { NextFunction, Request, Response } from 'express'

import { JWTPayload } from '../Types/JWT'
import JWTVerify from '../Utils/Promises/JWTVerify'

const VerifyJWT = async (req: Request, res: Response, next: NextFunction) => {
	const tokenHeader = req.headers['x-access-token']

	if (Array.isArray(tokenHeader)) {
		return res.status(401).json({
			errors: ['Failed to authenticate'],
			data: {},
		})
	}

	const token = tokenHeader?.split(' ')[1]

	if (!token)
		return res.status(401).json({
			errors: ['Failed to authenticate'],
			data: {},
		})

	await JWTVerify<JWTPayload>(token, process.env.JWT_SECRET)
		.then(user => {
			req.user = user

			next()
		})
		.catch(() => {
			return res.status(401).json({
				errors: ['Failed to authenticate'],
				data: {},
			})
		})
}

export default VerifyJWT