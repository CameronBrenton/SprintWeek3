const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
 

const initialize = (passport, getUserByName, getUserById) => {
	const authenticateUser = async (name, password, done) => {
		const user = getUserByName(name);
		if (user === undefined || user === null) {
			return done(null, false, { message: 'No user with that name found' });
		}

		try {
			const passwordMatched = await bcrypt.compare(password, global.passwords[user.name]);

			if (!passwordMatched) {
				return done(null, false, { message: 'Incorrect password' });
			}

			return done(null, user);
		} catch (err) {
			return done(err);
		}
	};

	const options = {
		usernameField: 'name'
	};

	passport.use(new LocalStrategy(options, authenticateUser));

	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		const user = getUserById(id);
		return done(null, user);
	});
};


module.exports = initialize;
