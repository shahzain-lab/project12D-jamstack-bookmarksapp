const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require("faunadb");
const q = faunadb.query;

const typeDefs = gql`
  type Query {
    bookmarks: [Bookmark!]
  }
  
  type Mutation{
    addBookmark(text: String!, url: String!): Bookmark
    delBookmark(id: ID!): Bookmark
    uptBookmark(id: ID!, text: String!, url: String!): Bookmark
  }

  type Bookmark {
    id: ID!
    text: String!
    url: String!
  }
`;

const client = new faunadb.Client({
  secret: process.env.FAUNA_ADMIN_SECRET
});

const resolvers = {
  Query: {
    bookmarks: async() => {
      try{
        const results = await client.query(
          q.Map(
          q.Paginate(q.Match(q.Index('all_bookmarks'))),
          q.Lambda((x) => q.Get(x))
          )
        )
        const data = results.data.map(d => {
          return {
            id: d.ref.id,
            text: d.data.text,
            url: d.data.url
          }
        })
        return data
      }catch(err){
        return err.toString()
      }
    },
  },
  Mutation: {
    addBookmark: async(_, {text, url}) => {
      try{
        const results = await client.query(
          q.Create(q.Collection('bookmarks'),
          {data: {text: text, url: url}})
        )
        return results.data
      }catch(err){
        return err.toString()
      }
    },
    delBookmark: async(_, {id}) => {
      try{
        const results = await client.query(
          q.Delete(q.Ref(q.Collection('bookmarks'), id))
        )
        return results.data
      }catch(err){
        return err.toString();
      }
    },
    uptBookmark: async(_, {id, text, url}) => {
      try{
        const results = await client.query(
          q.Update(
            q.Ref(q.Collection("bookmarks"), id),
            {data: {text: text, url: url}}
          )
        )
        return results.data;
      }catch(err){
        return err.toString()
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
