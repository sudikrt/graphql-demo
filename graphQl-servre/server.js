let express = require ('express');
let express_graphql = require('express-graphql');
let {buildSchema} = require ('graphql');


//GraphQL schema
var schema = buildSchema (`
    type Query {
        message : String
    }
`);

//Root resolver
var root = {
    message :  () => 'Hello QL'
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
