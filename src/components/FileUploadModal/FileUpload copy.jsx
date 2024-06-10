import { Button, Icon } from "../Component";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Stack,
  Backdrop,
  TextField,
  Typography,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import "./FileUpload.css";
import FileUploaded from "../FileUploaded";
export default function FileUpload({
  open,
  close,
  editFileId,
  formValues,
  Properties,
  handleOkay,
  selectedFile,
  fileNameInput,
  handleFileChange,
  handleChangeFile,
  matchedWorkspace,
  handleInputChange,
  handleCloseFileModal,
  handleDoctypeAutocomplete,
  clearFileInput,
  doctypeName,
  inputRef,
  onChooseFile,
  progress,
  uploadStatus,
}) {
  const [propertys, setPropertys] = useState([]);
  const property = () => {
    Properties?.map((data) => {
      setPropertys(data?.metaproperties);
    });
  };
  useEffect(() => {
    property();
  }, [Properties]);

  const metadata = matchedWorkspace?.map((data) => data?.doctype);
  //file

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 1 }} open={open}>
        <Card
          sx={{
            padding: "6px 15px 0px 15px",
            border: "1px solid grey",
            display: "flex",
            flexDirection: "column",
            width: "45%",
          }}
        >
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography variant="h6">File MetaData</Typography>
            <a
              onClick={editFileId ? handleCloseFileModal : close}
              className="close"
              style={{ cursor: "pointer" }}
            >
              <Icon name="cross-sm"></Icon>
            </a>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between">
            <Stack>
              <Box>
                <Grid container columnSpacing={1} rowSpacing={1} mt={0.5}>
                  <div item>
                    <TextField
                      size="small"
                      label="File Desc"
                      name="file_description"
                      sx={{
                        width: doctypeName ? "379px" : "380px",
                        marginLeft: "7px",
                      }}
                      value={fileNameInput.file_description}
                      onChange={handleChangeFile}
                    />
                  </div>
                  <Grid item xs={doctypeName ? 8.2 : 9.7} mb={1}>
                    <Autocomplete
                      fullWidth
                      size="small"
                      id="tags-outlined"
                      filterSelectedOptions
                      options={metadata || ""}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField {...params} label="Selected DocType" />
                      )}
                      onChange={(event, value) =>
                        handleDoctypeAutocomplete(value)
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container columnSpacing={1} rowSpacing={1}>
                  {Properties?.map((data) => (
                    <React.Fragment key={data.name}>
                      {data.fieldtype == "Text" ? (
                        <Grid item xs={4.1}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            type={data.fieldtype}
                            name={data.fieldname}
                            label={data.fieldname}
                            value={formValues[data.fieldname] || ""}
                            onChange={handleInputChange}
                          />
                        </Grid>
                      ) : (
                        <Grid item xs={4.1}>
                          <Autocomplete
                            disablePortal
                            size="small"
                            id="combo-box-demo"
                            name={data.fieldname}
                            options={data.metaproperties}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={data.fieldname}
                                size="small"
                              />
                            )}
                            value={formValues[data.fieldname] || ""}
                            onChange={handleInputChange}
                          />
                        </Grid>
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
              </Box>
              {editFileId > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="h6">Edit File Name</Typography>
                  <Stack flexDirection="row">
                    <Grid item xs={8}>
                      <TextField
                        size="small"
                        label="File Name"
                        name="name"
                        style={{ marginRight: "5px" }}
                        value={fileNameInput.name}
                        onChange={handleChangeFile}
                      />
                    </Grid>
                  </Stack>
                </Box>
              )}
            </Stack>
          </Stack>
          <Stack flexDirection="row">
            <FileUploaded
              handleOkay={handleOkay}
              clearFileInput={clearFileInput}
              handleFileChange={handleFileChange}
              inputRef={inputRef}
              editFileId={editFileId}
              onChooseFile={onChooseFile}
              progress={progress}
              close={close}
              selectedFile={selectedFile}
              uploadStatus={uploadStatus}
            />
            {uploadStatus === "select" ? (
              <button
                className="upload-btn"
                style={{ outline: "none", width: "100px", marginLeft: "20px" }}
                onClick={uploadStatus === "select" ? handleOkay : close}
              >
                Upload
              </button>
            ) : (
              ""
            )}
          </Stack>
        </Card>
      </Backdrop>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          {"File MetaData"}
          <a
            onClick={editFileId ? handleCloseFileModal : close}
            className="close"
            style={{ cursor: "pointer" }}
          >
            <Icon name="cross-sm"></Icon>
          </a>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="File Desc"
                name="file_description"
                // sx={{
                //   width: doctypeName ? "379px" : "380px",
                //   marginLeft: "7px",
                // }}
                value={fileNameInput.file_description}
                onChange={handleChangeFile}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                size="small"
                id="tags-outlined"
                filterSelectedOptions
                options={metadata || ""}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Selected DocType" />
                )}
                onChange={(event, value) => handleDoctypeAutocomplete(value)}
              />
              <Grid container spacing={1} mt={0.1} id="form">
                {Properties?.map((data) => (
                  <React.Fragment key={data.name}>
                    <Grid item xs={4}>
                      {data.fieldtype === "Text" ? (
                        <TextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          type={data.fieldtype}
                          name={data.fieldname}
                          label={data.fieldname}
                          value={formValues[data.fieldname] || ""}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <Autocomplete
                          disablePortal
                          size="small"
                          id="combo-box-demo"
                          name={data.fieldname}
                          options={data.metaproperties}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={data.fieldname}
                              size="small"
                            />
                          )}
                          value={formValues[data.fieldname] || ""}
                          onChange={handleInputChange}
                        />
                      )}
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
              {editFileId > 0 && (
                <React.Fragment>
                  <Typography variant="h6" fontSize="19px">
                    Edit File Name
                  </Typography>
                  <Grid item xs={8}>
                    <TextField
                      size="small"
                      label="File Name"
                      name="name"
                      style={{ marginRight: "5px" }}
                      value={fileNameInput.name}
                      onChange={handleChangeFile}
                    />
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {!editFileId ? (
            <FileUploaded
              handleOkay={handleOkay}
              clearFileInput={clearFileInput}
              handleFileChange={handleFileChange}
              inputRef={inputRef}
              editFileId={editFileId}
              onChooseFile={onChooseFile}
              progress={progress}
              close={close}
              selectedFile={selectedFile}
              uploadStatus={uploadStatus}
            />
          ) : (
            ""
          )}
          {uploadStatus === "select" && (
            <button
              className="upload-btn"
              style={{ outline: "none", width: "100px", marginLeft: "20px" }}
              onClick={handleOkay}
            >
              Upload
            </button>
          )}
          {uploadStatus === "uploading" && (
            <button
              className="upload-btn"
              style={{ outline: "none", width: "100px", marginLeft: "20px" }}
              onClick={editFileId ? handleCloseFileModal : close}
            >
              Cancel
            </button>
          )}
          {uploadStatus === "done" ? (
            <button className="upload-btn" onClick={close}>
              Done
            </button>
          ) : (
            ""
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
