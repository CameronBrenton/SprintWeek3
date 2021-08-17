const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
 

const initialize = (passport, getUserByEmail, getUserById) => {
	const authenticateUser = async (email, password, done) => {
		const user = await getUserByEmail(email);
		if (user === undefined || user === null) {
			return done(null, false, { message: 'No user with that name found' });
		}

		try {
			const passwordMatched = await bcrypt.compare(password, user.password);

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

	passport.serializeUser((user, done) => done(null, user.userid));
	passport.deserializeUser(async (userid, done) => {
		const user = await getUserById(userid);
		return done(null, user);
	});
};


module.exports = initialize;
