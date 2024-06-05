import React, { createContext, useState } from "react";

const postContext = createContext(null);

function Post({ children }) {
  const [postDetails, setPostDetails] = useState();

  return (
    <postContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </postContext.Provider>
  );
}

export { Post, postContext };
