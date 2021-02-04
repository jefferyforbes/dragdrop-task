import React from "react";
import background from "./background.png";

function Home() {
	return (
		<div className="backgroundImage" style={{ backgroundImage: `url(${background})` }}>
      Hello World
    </div>
	);
}

export default Home;
