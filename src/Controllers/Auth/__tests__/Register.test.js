import request from 'supertest'

import Create from '../../../Services/User/Create'
import FindByEmailOrUsername from '../../../Services/User/FindByEmailOrUsername'

import App from '../../../App'

jest.mock('../../../Services/User/Create')
jest.mock('../../../Services/User/FindByEmailOrUsername')

describe('Register', () => {
	afterEach(() => {
		jest.clearAllMocks()
		jest.restoreAllMocks()
		jest.resetModules()
	})

	it('Should success', async () => {
		const user = {
			username: 'testtest1234',
			name: 'Testtest1234',
			email: 'testtest1234@gmail.com',
			password: 'testtest1234',
		}

		Create.mockResolvedValueOnce({
			user: {
				_id: 'id',
			},
		})

		FindByEmailOrUsername.mockRejectedValueOnce({ code: 404 })

		return request(App)
			.post('/api/auth/register')
			.send(user)
			.then(res => {
				expect(res.statusCode).toEqual(201)
				expect(res.body).toHaveProperty('data')
				expect(res.body).toEqual({
					success: true,
					data: {
						id: 'id',
					},
				})
			})
	})
})