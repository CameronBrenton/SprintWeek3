


function btnwork(){
 getElementById("myBtn").addEventListener("click", myFunction)
function myFunction() {
query = getElementById("searchy")
console.log("query")

}
 }

 //Sign In
app.get("/signIn", function (req, res) {
	res.sendFile(path.join(__dirname, 'signup.html'));
});
app.post("/signIn", async function (req, res) {
	const email = req.body.email;
	const password = req.body.password;
	let results = await pool.query("SELECT * FROM users WHERE email =$1", [email]);
	if (results.rows < 1) {
		res.send("Oh no! no account found.");
	} else if (results.rows > 1) {
		console.warn("there are two accounts with the same email!");
	} else {
		if (bcrypt.compare(password, results.rows[0].password)) {
			req.session.loggedIn = true;
			res.send("congrats! you've logged in");
		} else {
			res.send("invailid password please try again");
		}
	}
});


const get_route = (request, response) => {
    pool.query('SELECT route_name FROM public."site_routes"', (error, results) => {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows)
    })
}

const get_role = (request, response) => {
    pool.query('SELECT role_name, description FROM public."user_roles"', (error, results) => {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows)
    })
}

const get_route_and_role = (request, response) => {
    const role = request.params.role
    pool.query('SELECT route_name FROM public."roles_and_their_routes" WHERE role_name = $1', [role], (error,results) => {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows)
    })
}

module.exports ={
    get_role,
    get_route,
    get_route_and_role
};