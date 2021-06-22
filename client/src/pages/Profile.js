import React from "react";
// redirect user to another route within app, like location.replace() but doesn't reload browser
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";
import Auth from "../utils/auth";

const Profile = () => {
  // retrieves username from URL
  const { username: userParam } = useParams();

  // if there's a value in userParam from URL, use value to run QUERY_USER
  // if no value in userParam, visit /profile as logged in user and execute QUERY_ME
  const { loading, data } = useQuery(userParam ? QUERY_USER: QUERY_ME, {
    variables: { username: userParam },
  });

  // pass props to ThoughtList component to render user's thoughts
  // if run QUERY_ME, response returns data in "me" prop
  // if QUERY_USER, returns data in "user" prop
  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is logged-in user's
  // check if user is logged in and if so, if username stored in JWT is same as userParam
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    // if match, return Redirect component with prop to /profile
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if no user to display, we aren't logged in, or at another user's profile page
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          {/* if userParam doesn't exist, YOUR profile */}
          {/* otherwise, display username of other user */}
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
          />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
