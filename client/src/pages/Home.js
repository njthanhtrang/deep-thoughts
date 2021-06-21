import React from "react";
// make requests to GraphQL server, from <ApolloProvider> in App.js
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils/queries";
import ThoughtList from "../components/ThoughtList";

const Home = () => {
  // use useQuery hook to make query request from apollo server
  // when load Home component, execute query for thought data
  // async loading property. when finished, info stored in data property
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // optional chaining, only browsers support this
  // do not need to check if obj exists before accessing its properties
  // no data exists until query to server finishes
  // if data exists, store in thoughts constant, if data undefined, save empty array to thoughts component
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {/* conditionally render <ThoughtList> */}
          {loading ? (
            <div>Loading...</div>
            // once query complete and loading is undefined
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
