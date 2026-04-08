import { useEffect } from "react";

import "./App.css";

import { View } from "itowns";

function App() {
    useEffect(() => {
        const viewerDiv = document.getElementById("viewerDiv");
        if (viewerDiv === null) {
            return;
        }
        viewerDiv.style.display = "block";
        const view = new View("EPSG:25831", viewerDiv);
    }, []);

    return (
        <div style={ { height: "100vh", width: "100vw", position: "relative" } }>
            <div id="viewerDiv" />
        </div>
    );
}

export default App;
