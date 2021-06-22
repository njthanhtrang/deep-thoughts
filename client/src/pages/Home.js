import React from "react";
// make requests to GraphQL server, from <ApolloProvider> in App.js
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import ThoughtForm from "../components/ThoughtForm";
import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";
import Auth from "../utils/auth";

const Home = () => {
  // use useQuery hook to make query request from apollo server
  // when load Home component, execute query for thought data
  // async loading property. when finished, info stored in data property
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // obj destructuring extracts "data" from "useQuery" Hook's response, rename to "userData"
  // if user logged in with valid token, userData holds all returned info
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // optional chaining, only browsers support this
  // do not need to check if obj exists before accessing its properties
  // no data exists until query to server finishes
  // if data exists, store in thoughts constant, if data undefined, save empty array to thoughts component
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  // if logged in, true; otherwise, false
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        {/* if user isn't logged in, span full width of row */}
        {/* if logged in, span 8 columns, leaving 4 column div on right side */}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {/* conditionally render <ThoughtList> */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            // once query complete and loading is undefined
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          // render righthand column <div> holding FriendList component
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
