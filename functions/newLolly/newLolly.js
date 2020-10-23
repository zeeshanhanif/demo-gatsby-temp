const { ApolloServer, gql } = require('apollo-server-lambda')

const faunadb = require('faunadb'),
  q = faunadb.query;

const typeDefs = gql`
  type Query {
    hello: String
    getLolly: Lolly
  }
  type Lolly {
    id: ID!
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
  }

  type Mutation {
    createLolly (recipientName:String!, message: String!, senderName: String!,flavourTop: String!,flavourMiddle: String!,flavourBottom: String!): Lolly
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello, world!'
    },
    getLolly: ()=> {
      return {
        recipientName: "Shan",
        message: "this is message",
        senderName: "Amir",
        flavourTop: "red",
        flavourMiddle: "blue",
        flavourBottom: "green"
      }
    }
  },
  Mutation : {
    createLolly: async (_, lollyData)=>{
      console.log("on server = ", lollyData);
      try {
        
        var client = new faunadb.Client({secret: "fnAD4yiiH-ACBRUTVFGw2j44LqP5B-0OKXQBpuYa"});
        var result = await client.query(
          q.Create(q.Collection("lollies"), {
            data: lollyData
          })
        )
        console.log("server results = ", result.data);
        return result.data;
      }
      catch(error){
        console.log("server error = ", error);
        return {
          error: error.message
        }
      }

    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
