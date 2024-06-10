import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Watermark, notification } from "antd";
import Dialog from "@mui/material/Dialog";
import Head from "../../layout/head/Head";
import FileViewer from "react-file-viewer";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Content from "../../layout/content/Content";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import DialogTitle from "@mui/material/DialogTitle";
import { UserContext } from "../../context/UserContext";
import DialogActions from "@mui/material/DialogActions";
import LinearProgress from "@mui/material/LinearProgress";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Button,
  RSelect,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
} from "../../../src/components/Component";
import {
  Card,
  Grid,
  Stack,
  Tooltip,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import Viewer from "./Viewer";
function Fileviewer() {
  const {
    getnotes,
    getdoclist,
    CommonNotes,
    deleteNotes,
    getmetalist,
    workSpaceData,
    addmetaproperties,
    add_metaproperties,
  } = useContext(UserContext);
  const [url, setUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [doctypeName, setDoctypeName] = useState("");
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [propertys, setPropertys] = useState([]);
  const [addProperties, setAddProperties] = useState([]);
  const [docListUpload, setDocListupload] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [addProperty, setAddProperty] = useState({
    notes: "",
  });
  const history = useHistory();
  const location = useLocation();
  const workspace_type = location?.state?.workspace_type;
  const commentHide = location?.state?.commentHide;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getNoteslist();
  }, [deleteId]);

  useEffect(() => {
    getNoteslist();
  }, [todos]);
  useEffect(() => {
    getmetatypelist();
    getdoclistuploadfile();
  }, []);
  // ------------------------------------------apis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_LOCAL}/filedata`,
          {
            filemongo_id: location.state.filemongo_id,
          }
        );
        setFileType(response?.data.newdata.file_type);

        const data = response.data.file_data.data;

        const uint8Array = new Uint8Array(data);

        const blob = new Blob([uint8Array], {
          type: response.data.newdata.file_type,
        });
        const url = URL.createObjectURL(blob);
        setUrl(url);
      } catch (error) {}
    };
    fetchData();
  }, []);
  const onNotesSubmit = () => {
    notification["success"]({
      placement: "top",
      description: "",
      message: "Comment Created Successfully...",
    });
    let data = {
      id: location.state.id,
      notes: addProperty.notes,
    };
    CommonNotes(
      data,
      (apiRes) => {
        resetForm();
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const getNoteslist = () => {
    let data = {
      id: location.state.id,
    };
    getnotes(
      data,
      (apiRes) => {
        setNotes(apiRes.data.details);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const onDeleteClick = (id) => {
    notification["success"]({
      placement: "topLeft",
      description: "",
      message: "Comment Deleted Successfully...",
    });
    setDeleteId(true);

    let data = {
      id: id,
    };
    deleteNotes(
      data,
      (apiRes) => {
        setAuthToken(token);
        getNoteslist();
      },
      (apiErr) => {}
    );
  };
  const getdoclistuploadfile = () => {
    getdoclist(
      {},
      (apiRes) => {
        setDocListupload(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const [metaList, setMetaList] = useState([]);

  const getmetatypelist = () => {
    getmetalist(
      {},
      (apiRes) => {
        setMetaList(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const onSubmitProperties = (e) => {
    let data = {
      doctype: e?.label,
      workspace_name: workSpaceData?.workspace_name,
    };
    add_metaproperties(
      data,
      (apiRes) => {
        setAddProperties(apiRes.data);
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };
  const addmetapropertie = () => {
    notification["success"]({
      placement: "bottomLeft",
      description: "",
      message: "Added Properties",
    });
    let data = {
      doctype: doctypeName,
      fieldnames: formValues,
      file_name: location.state.file,
    };
    addmetaproperties(
      data,
      (apiRes) => {
        setAddProperties(apiRes.data);
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };

  const matchedWorkspace = metaList?.filter(
    (data) => data.workspace_name === workSpaceData?.workspace_name
  );

  const metadata = matchedWorkspace?.map((data) => ({
    label: data?.doctype,
    value: data?.doctype,
  }));

  // ------------------------------------------apis
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleOnClick = (e) => {
    onSubmitProperties(e);
    setDoctypeName(e?.label);
  };
  const property = () => {
    addProperties?.map((data) => {
      setPropertys(data.metaproperties);
    });
  };
  useEffect(() => {
    property();
  }, [addProperties]);
  const addTask = () => {
    setTodos([...todos, addProperty]);
    setAddProperty("");
  };
  const resetForm = () => {
    setAddProperty({
      notes: "",
    });
  };

  const navigate = () => {
    history.push(`/${workspace_type}`);
  };
  return (
    <React.Fragment>
      <Head title="File Viewer - Regular"></Head>
      <Content>
        <Stack>
          <div
            style={{
              border: "1px solid lightgrey",
              width: "100%",
            }}
          >
            {url.length ? (
              <>
                <Viewer
                  fileURL={url}
                  location={location}
                  navigate={navigate}
                  fileType={fileType}
                />
              </>
            ) : (
              <LinearProgress
                color="primary"
                sx={{
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#101924",
                    width: "300px",
                  },
                }}
                style={{
                  width: "100%",
                  position: "absolute",
                  top: 3.4,
                  left: 0,
                  backgroundColor: "lightgray",
                }}
              />
            )}
          </div>
        </Stack>
      </Content>
    </React.Fragment>
  );
}
export default Fileviewer;
