import Logger from '../../Utils/Logger/Logger'

import FindUserById from '../../Services/User/FindById'

const GetUserData = (req, res) => {
	const { id } = req.user

	FindUserById({ id })
		.then(({ user }) => {
			Logger.info('Get user data success', {
				id: user._id,
			})

			return res.status(200).json({
				success: true,
				data: {
					id: user._id,
					username: user.username,
					name: user.name,
					email: user.email,
				},
			})
		})
		.catch(({ code }) => {
			if (code === 404) {
				return res.status(404).json({
					success: false,
					error: 'User not found',
				})
			}

			return res.status(500).json({
				success: false,
				error: 'Internal server error',
			})
		})
}

export default GetUserData
