import * as mockingoose from 'mockingoose'

import mongoose from 'mongoose'

import FindByEmail from '../FindByEmail'

// Models
import User from '../../../Models/User'

describe('Find by email user service', () => {
	afterEach(() => {
		mockingoose.resetAll()
	})

	it('Should get user', () => {
		expect.assertions(6)

		const user = {
			_id: mongoose.Types.ObjectId('62c526bb503a77b155f6eba5'),
			username: 'username',
			name: 'Name',
			email: 'email@example.com',
			password: 'password',
		}

		mockingoose(User).toReturn(query => {
			expect(query.getQuery().email).toBe('email@example.com')

			if (query.getQuery().email === user.email) return user
		}, 'findOne')

		const findByIdPromise = FindByEmail({ email: user.email }).then(
			({ user: newUser }) => {
				expect(newUser._id).toBe(user._id)
				expect(newUser.email).toBe(user.email)
				expect(newUser.name).toBe(user.name)
				expect(newUser.password).toBe(user.password)
				expect(newUser.username).toBe(user.username)
			}
		)

		return findByIdPromise
	})

	it('Should reject with 404', async () => {
		expect.assertions(2)

		const user = {
			_id: mongoose.Types.ObjectId('62c526bb503a77b155f6eba6'),
			username: 'username1',
			name: 'Name1',
			email: 'email1@example.com',
			password: 'password1',
		}

		mockingoose(User).toReturn(query => {
			expect(query.getQuery().email).toBe('email2@example.com')

			if (query.getQuery()._id === user._id) return user
		}, 'findOne')

		const mock = jest.fn()

		try {
			await FindByEmail({ email: 'email2@example.com' })
		} catch ({ code }) {
			mock(code)
		}

		expect(mock).toHaveBeenCalledWith(404)
	})
})
