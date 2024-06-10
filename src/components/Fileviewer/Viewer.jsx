import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import "./fileViewer.css";
import { BlockHeadContent } from "../Component";
import { Tooltip } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Viewer = ({ fileURL, location, navigate, fileType }) => {
  const viewer = useRef(null);

  useEffect(() => {
    if (!fileURL) return;

    WebViewer(
      {
        path: "/webviewer/lib",
      },
      viewer.current
    ).then((instance) => {
      const { documentViewer } = instance.Core;

      instance.UI.loadDocument(fileURL, { extension: fileType });

      documentViewer.setWatermark({
        // Draw diagonal watermark in middle of the document
        diagonal: {
          fontSize: 50,
          fontFamily: "sans-serif",
          color: "grey",
          opacity: 30,
          text: "ACME",
        },

        // Draw header watermark
        header: {
          fontSize: 15,
          fontFamily: "sans-serif",
          color: "grey",
          opacity: 50,
          left: "ACME",
          center: "ACME",
          right: "ACME",
        },
      });
    });

  }, [fileURL]);

  return (
    <div className="App">
      <div className="header">
        {location.state.file}
        <BlockHeadContent>
          <Tooltip
            title="Close"
            style={{
              margin: "0px 10px 8px 0px",
            }}
          >
            <HighlightOffIcon onClick={navigate} />
          </Tooltip>
        </BlockHeadContent>
      </div>
      <div className="webviewer" ref={viewer} style={{ height: "600px" }}></div>
    </div>
  );
};

export default Viewer;
