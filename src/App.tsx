import { useEffect } from "react";

import "./App.css";

import { PlanarControls, Potree2Layer, Potree2Source, View } from "itowns";
import { Vector3 } from "three";

function zoomToLayer(view: any, layer: any) {
    const camera = view.camera3D;
    const obb = layer.root.voxelOBB;
    const center = obb.box3D.getCenter(new Vector3());
    obb.localToWorld(center);
    const length = obb.box3D.getSize(new Vector3()).length();
    const fov = camera.fov * (Math.PI / 180);
    const radius = length / 2;
    const distance = radius / Math.tan(fov / 2);
    camera.position.copy(center).addScaledVector(new Vector3(0, 0, 1), distance);
    camera.up.copy(new Vector3(0, 1, 0));
    camera.far = 2 * distance;
    camera.lookAt(center);
    camera.updateProjectionMatrix();
    view.notifyChange(camera);
}

function App() {
    useEffect(() => {
        const viewerDiv = document.getElementById("viewerDiv");
        if (viewerDiv === null) {
            return;
        }
        const crs = "EPSG:4326";
        viewerDiv.style.display = "block";
        const view = new View(crs, viewerDiv);
        const potreeSource = new Potree2Source({
            url: "https://raw.githubusercontent.com/iTowns/iTowns2-sample-data/master/pointclouds/potree2.0/lion/metadata.json",
            crs
        });
        const potreeLayer = new Potree2Layer("Lion", {
            source: potreeSource
        });

        function onLayerReady() {
            zoomToLayer(view, potreeLayer);
            const controls = new PlanarControls(view);
            controls.groundLevel = potreeLayer.minElevationRange;
        }

        view.addLayer(potreeLayer).then(onLayerReady);
    }, []);

    return (
        <div style={ { height: "100vh", width: "100vw", position: "relative" } }>
            <div id="viewerDiv" />
        </div>
    );
}

export default App;
