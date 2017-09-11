
const express = require('express');
const router = express.Router();

const {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString
} = require('graphql');


const crud = require('../crud');


function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

const students = new crud(
	'students', 
	{
		identificacion: {type: GraphQLString},
		nombres: {type: GraphQLString},
		apellidos: {type: GraphQLString},
		genero: {type: GraphQLString}
	},
	'el estudiante',
	'los estudiantes'
);

const teachers = new crud(
	'teachers', 
	{
		identificacion: {type: GraphQLString},
		nombres: {type: GraphQLString},
		apellidos: {type: GraphQLString},
		genero: {type: GraphQLString}
	},
	'el docente',
	'los docentes'
);
const courses = new crud(
	'courses', 
	{
		codigo: {type: GraphQLString},
		nombre: {type: GraphQLString},
		observaciones: {type: GraphQLString}
	},
	'el curso',
	'los cursos'
);

var schema = new GraphQLSchema({
	mutation: new GraphQLObjectType({
		name: 'RootMutationType',
		fields: Object.assign(
			{},
			students.mutation(),
			teachers.mutation(),
			courses.mutation()
		)
	}),
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: Object.assign(
			{},
			students.query(),
			teachers.query(),
			courses.query()
		)
	})
});

router.post('/graphql', function (req, res, next) {
	var query = req.body.query;
	graphql(schema, query).then(result => {
		res.json(result);
	})
});

router.post('/login', function (req, res, next) {
	var usr = req.body.usuario;
	var pwd = req.body.password;
	if (usr === 'admin' && pwd === 'admin') {
		res.writeHead(200, {
			'Set-Cookie': 'session='+usr,
			'Content-Type': 'text/html'
		});
		res.end(`<html><head><script>location.href='/'</script></head></html>`);
		return
	}
	res.end();
});

router.get('/login', function (req, res, next) {
	var cookies = parseCookies(req);
	if (cookies.session !== undefined) {
		res.redirect('/');
		return;
	}
	res.end(`
		<html>
			<body>
				El usuario y la contrase&ntilde;a es admin, admin.
				<br>
				<br>
				<form method='POST' action='/login' enctype='application/x-www-form-urlencoded'>
					usuario:
					<input type='text' name='usuario'>
					password:
					<input type='password' name='password'>
					<button type='submit'>Enviar</button>
				</form>
			</body>
		</html>
	`);
});

module.exports = router;
