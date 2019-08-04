let express = require ('express');
let express_graphql = require('express-graphql');
let {buildSchema} = require ('graphql');


//GraphQL schema
var schema = buildSchema (`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    }
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course {
        id: Int
        title: String
        author:String
        description: String
        topic: String
        url: String
    }
`);
let coursesData = [
    {
        id: 1,
        title: 'Test _1',
        author: 'Sudi',
        description : 'test desc 1',
        topic: 'sample',
        url : 'https://example.com'
    },
    {
        id: 2,
        title: 'Test _2',
        author: 'Sudi-2',
        description : 'test desc 2',
        topic: 'sample-2',
        url : 'https://example.com/2'
    },
    {
        id: 3,
        title: 'Test _3',
        author: 'Sudi-3',
        description : 'test desc 2',
        topic: 'sample-3',
        url : 'https://example.com/3'
    },
    {
        id: 4,
        title: 'Test _4',
        author: 'Sudi-4',
        description : 'test desc 4',
        topic: 'sample-4',
        url : 'https://example.com/4'
    },
    {
        id: 5,
        title: 'Test _5',
        author: 'Sudi-5',
        description : 'test desc 5',
        topic: 'sample-5',
        url : 'https://example.com/5'
    }
];
var getCourse = function (args) {
    var id = args.id;
    return coursesData.filter (course => {
        return course.id === id;
    })[0];
}

var getCourses = function (args) {
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter (course => {
            return course.topic === topic;
        });
    } else {
        return coursesData;
    }
}
var updateCourseTopic = function( {id, topic}) {
    coursesData.map (course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });
    return coursesData.filter (course => { return course.id === id})[0];
}
//Root resolver
var root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
};

//create an express server
//graphiql - provides a user interface in browser
var app = express ();
app.use ('/graphql', express_graphql ({
    schema : schema,
    rootValue : root,
    graphiql : true
}));

app.listen (4000, () => console.log ('Express graphQL now running on localhost:4000/graphql'));
