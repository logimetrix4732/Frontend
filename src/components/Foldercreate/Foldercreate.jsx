import React from "react";
import { TextField } from "@mui/material";
import {
  Dialog,
  Button,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
const Foldercreate = ({
  id,
  open,
  title,
  input,
  addNew,
  editFolderId,
  type = "normal",
  folderNameInput,
  buttonSuccessTitle = "Okay",
  buttonCancelTitle = "Cancel",
  handleClose = () => alert("Please add handle cancel function"),
  handleChange = () => alert("Please add handle change function"),
  inputList = [
    { type: "file", name: "Default", placeholder: "Default Placeholder" },
  ],
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="responsive-dialog-title">
        {editFolderId ? "Update Folder" : "Create Folder"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {type == "form" && (
            <FormControl>
              {inputList?.map((data, index) => (
                <TextField
                  fullWidth
                  key={index}
                  size="small"
                  type={data.type}
                  name={data.name}
                  variant="outlined"
                  margin="0px 10px 10px 10px"
                  onChange={handleChange}
                  label={data.placeholder}
                  value={folderNameInput.name}
                />
              ))}
            </FormControl>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" id="closeBtn" onClick={handleClose}>
          {buttonCancelTitle}
        </Button>
        <Button id="submitBtn" onClick={() => addNew(id, input)}>
          {editFolderId ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Foldercreate;
