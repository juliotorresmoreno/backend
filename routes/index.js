
const express = require('express');
const router = express.Router();

const {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString
} = require('graphql');


const crud = require('../crud');

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

module.exports = router;
