import React from "react";

// desgtructure from props
const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

//   if thoughts, return list of thoughts with .map()
  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
            // key prop: React internally tracks which data needs to be rerendered if something changes
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              {thought.username}
              thought on {thought.createdAt}
            </p>
            <div className="card-body">
              <p>{thought.thoughtText}</p>
              <p className="mb-0">
                Reactions: {thought.reactionCount} || Click to{" "}
                {/* if no reactions, user starts discussion, adding first rxn */}
                {/* if there are reactions, user will view or add rxn to existing list */}
                {thought.reactionCount ? "see" : "start"} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
