const { ApolloServer, gql } = require('apollo-server-lambda')
const shortid = require("shortid");

const faunadb = require('faunadb'),
  q = faunadb.query;

const typeDefs = gql`
  type Query {
    hello: String
    getLolly(lollyPath: String!): Lolly
  }
  type Lolly {
    id: ID!
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    lollyPath: String!
  }

  type Mutation {
    createLolly (recipientName:String!, message: String!, senderName: String!,flavourTop: String!,flavourMiddle: String!,flavourBottom: String!): Lolly
  }
`
var client = new faunadb.Client({secret: "fnAD4yiiH-ACBRUTVFGw2j44LqP5B-0OKXQBpuYa"});
const resolvers = {
  Query: {
    hello: () => {
      return 'Hello, world!'
    },
    getLolly: async (_,{lollyPath})=> {
        console.log("Helo world = ", lollyPath);
        var result = await client.query(
          q.Get(q.Match(q.Index("lolly_by_path"),lollyPath))
          
        )
        console.log("Lolly result get = ",result.data);
        return result.data;

        /*
      return {
        recipientName: "Shan",
        message: "this is message",
        senderName: "Amir",
        flavourTop: "red",
        flavourMiddle: "blue",
        flavourBottom: "green"
      }*/
    }
  },
  Mutation : {
    createLolly: async (_, lollyData)=>{
      console.log("on server = ", lollyData);
      const uniquePath = shortid.generate();
      lollyData.lollyPath = uniquePath;
      try {
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
