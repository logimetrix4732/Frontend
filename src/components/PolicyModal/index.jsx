import * as React from "react";
// import { DatePicker } from "antd";
import Dialog from "@mui/material/Dialog";
import { Cancel } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  Grid,
  Stack,
  Tooltip,
  Checkbox,
  Typography,
  FormControl,
  Autocomplete,
  FormControlLabel,
  Button,
  Select,
  InputLabel,
  MenuItem,
  ListItemText,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import SelectBox from "../SelectBox";
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function PolicyModal({
  open,
  title,
  title1,
  title2,
  title3,
  title4,
  title5,
  title7,
  title8,
  email,
  version,
  addTask,
  Policies,
  password,
  BandWidth,
  recyclebin,
  linkSharing,
  addPolicies,
  versionfield,
  onFormSubmit,
  userDropdowns,
  editExtension,
  groupsDropdown,
  setAddPolicies,
  checkboxValues,
  recyclebinfield,
  handleShareData,
  handleDateChange,
  handleCheckboxChange,
  handleAutocompleteChange,
  handlemultiSelectChange,
  type = "normal",
  saveEdit,
  editedTask,
  cancelEdit,
  removeTask,
  editingIndex,
  startEditing,
  handleInputChange,
  buttonSuccessTitle = "Okay",
  buttonCancelTitle = "Cancel",
  handleClose = () => alert("Please add handle cancel function"),
  handleOkay = () => alert("Please add handle success function"),
  handleChange = () => alert("Please add handle change function"),
  inputList = [
    { type: "file", name: "Default", placeholder: "Default Placeholder" },
  ],
}) {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [personName, setPersonName] = React.useState([]);

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ mr: 1, mb: -2, mt: -1 }}>{title}</DialogTitle>
        <DialogContent>
          {type === "form" && (
            <FormControl>
              <Grid container spacing={1} sx={{ mt: 0.1 }}>
                <Grid
                  container
                  spacing={1}
                  sx={{ mt: 0.1 }}
                  style={{ width: "550px", height: "auto" }}
                >
                  {/* Policies */}
                  <Grid item  xs={6}>
                    <Autocomplete
                      fullWidth
                      size="small"
                      options={["My Workspace", "TeamSpace", "Data Room"]}
                      renderInput={(params) => (
                        <TextField {...params} label="Type" />
                      )}
                      value={addPolicies?.policy_type}
                      onChange={(e, newValue) =>
                        setAddPolicies({
                          ...addPolicies,
                          policy_type: newValue,
                        })
                      }
                    />
                  </Grid>
                  {Policies?.map((data, index) => (
                    <Grid item xs={6} key={index}>
                      <TextField
                        fullWidth
                        size="small"
                        type={data.type}
                        name={data.name}
                        variant="outlined"
                        defaultValue={addPolicies[data.name]}
                        onChange={handleShareData}
                        value={addPolicies.name}
                        label={data.placeholder}
                        inputProps={{
                          style: {
                            padding: "7px",
                          },
                        }}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={6}>
                    <SelectBox
                      id="selected_user"
                      label="Select User"
                      items={userDropdowns}
                      handleChange={handlemultiSelectChange}
                      selectedItems={addPolicies?.selected_user}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectBox
                      id="selected_group"
                      label="Select Group"
                      items={groupsDropdown}
                      handleChange={handlemultiSelectChange}
                      selectedItems={addPolicies?.selected_group}
                    />
                  </Grid>
                </Grid>
                {addPolicies.policy_type == "TeamSpace" ? (
                  <>
                    {/* Password Setting */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title1}
                      </DialogTitle>
                    </Grid>
                    {inputList?.map((data, index) => (
                      <>
                        <Grid item xs={4} key={index}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            onChange={handleShareData}
                            value={addPolicies.name}
                            label={data.placeholder}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    {password?.map((data, index) => (
                      <>
                        <Grid item xs={4} key={index}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            onChange={handleShareData}
                            value={addPolicies.name}
                            label={data.placeholder}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    {/* File Extension */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title2}
                      </DialogTitle>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        value={editedTask}
                        onChange={handleInputChange}
                        placeholder={
                          editingIndex === null
                            ? "Enter File Extension"
                            : "Edit File Extension"
                        }
                        variant="outlined"
                        sx={{ mr: 0.5 }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={
                          editingIndex === null
                            ? addTask
                            : () => saveEdit(editingIndex)
                        }
                        style={{ marginRight: "3px" }}
                      >
                        {editingIndex === null ? "Add" : "Edit"}
                      </Button>
                      {editingIndex !== null && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={cancelEdit}
                        >
                          <Cancel />
                        </Button>
                      )}
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      border="1px solid grey"
                      ml={1.2}
                      mt={1}
                    >
                      {editExtension.map((task, index) => (
                        <Grid item xs={2.9} key={index} flexDirection="row">
                          <Stack flexDirection="row">
                            {task}
                            <Tooltip
                              title="Edit"
                              style={{ cursor: "pointer" }}
                              onClick={() => startEditing(index, task)}
                            >
                              <EditIcon sx={{ mr: 1 }} fontSize="small" />
                            </Tooltip>
                            <Tooltip
                              title="Delete"
                              style={{ cursor: "pointer" }}
                              onClick={() => removeTask(index)}
                            >
                              <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                            </Tooltip>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                    {/* Link Expiry */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title3}
                      </DialogTitle>
                    </Grid>
                    {linkSharing?.map((data, index) => (
                      <>
                        <Grid item xs={4} key={index}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            onChange={handleShareData}
                            value={addPolicies.name}
                            label={data.placeholder}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    {/* Email */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title4}
                      </DialogTitle>
                    </Grid>
                    {email?.map((data, index) => (
                      <>
                        <Grid item xs={4} key={index}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            onChange={handleShareData}
                            value={addPolicies.name}
                            label={data.placeholder}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    {/* BandWidth */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title5}
                      </DialogTitle>
                    </Grid>
                    {BandWidth?.map((data, index) => (
                      <>
                        <Grid item xs={4} key={index}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            value={addPolicies.name}
                            label={data.placeholder}
                            onChange={handleShareData}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title7}
                      </DialogTitle>
                    </Grid>
                    {recyclebin?.map((data, index) => (
                      <>
                        <Grid item key={index}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={data.name}
                                checked={checkboxValues[data.name]}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {checkboxValues?.recycle_bin == true ? (
                      <>
                        {recyclebinfield?.map((data, index) => (
                          <>
                            <Grid item xs={4} key={index}>
                              <TextField
                                fullWidth
                                size="small"
                                type={data.type}
                                name={data.name}
                                variant="outlined"
                                value={addPolicies.name}
                                label={data.placeholder}
                                onChange={handleShareData}
                                defaultValue={addPolicies[data.name]}
                                inputProps={{
                                  style: {
                                    paddingTop: "7px",
                                  },
                                }}
                              />
                            </Grid>
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    <Grid item xs={10} sx={{ mb: -3.5 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title8}
                      </DialogTitle>
                    </Grid>

                    {version?.map((data, index) => (
                      <>
                        <Grid item key={index}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={data.name}
                                checked={checkboxValues[data.name]}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {checkboxValues.versions == true ? (
                      <>
                        {versionfield?.map((data, index) => (
                          <>
                            <Grid item xs={4} key={index}>
                              <TextField
                                fullWidth
                                size="small"
                                type={data.type}
                                name={data.name}
                                variant="outlined"
                                value={addPolicies.name}
                                label={data.placeholder}
                                onChange={handleShareData}
                                defaultValue={addPolicies[data.name]}
                                inputProps={{
                                  style: {
                                    paddingTop: "5px",
                                  },
                                }}
                              />
                            </Grid>
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
                {/* ------------------------------------------------ */}
                {addPolicies.policy_type == "My Workspace" ? (
                  <>
                    {/* File Extension */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title2}
                      </DialogTitle>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        value={editedTask}
                        onChange={handleInputChange}
                        placeholder={
                          editingIndex === null
                            ? "Enter File Extension"
                            : "Edit File Extension"
                        }
                        variant="outlined"
                        sx={{ mr: 0.5 }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={
                          editingIndex === null
                            ? addTask
                            : () => saveEdit(editingIndex)
                        }
                        style={{ marginRight: "3px" }}
                      >
                        {editingIndex === null ? "Add" : "Edit"}
                      </Button>
                      {editingIndex !== null && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={cancelEdit}
                        >
                          <Cancel />
                        </Button>
                      )}
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      border="1px solid grey"
                      ml={1.2}
                      mt={1}
                    >
                      {editExtension.map((task, index) => (
                        <Grid item xs={2.9} key={index} flexDirection="row">
                          <Stack flexDirection="row">
                            {task}
                            <Tooltip
                              title="Edit"
                              style={{ cursor: "pointer" }}
                              onClick={() => startEditing(index, task)}
                            >
                              <EditIcon sx={{ mr: 1 }} fontSize="small" />
                            </Tooltip>
                            <Tooltip
                              title="Delete"
                              style={{ cursor: "pointer" }}
                              onClick={() => removeTask(index)}
                            >
                              <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                            </Tooltip>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                    {/* BandWidth */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title5}
                      </DialogTitle>
                    </Grid>
                    {BandWidth?.map((data, index) => (
                      <>
                        <Grid item xs={4} key={index}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            value={addPolicies.name}
                            label={data.placeholder}
                            onChange={handleShareData}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    {/* recyclebin */}
                    <Grid item xs={10} sx={{ mb: -3.5 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title7}
                      </DialogTitle>
                    </Grid>
                    {recyclebin?.map((data, index) => (
                      <>
                        <Grid item key={index}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={data.name}
                                checked={checkboxValues[data.name]}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {checkboxValues?.recycle_bin == true ? (
                      <>
                        {recyclebinfield?.map((data, index) => (
                          <>
                            <Grid item xs={4} key={index}>
                              <TextField
                                fullWidth
                                size="small"
                                type={data.type}
                                name={data.name}
                                variant="outlined"
                                value={addPolicies.name}
                                label={data.placeholder}
                                onChange={handleShareData}
                                defaultValue={addPolicies[data.name]}
                                inputProps={{
                                  style: {
                                    paddingTop: "7px",
                                  },
                                }}
                              />
                            </Grid>
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    {/* version */}
                    <Grid item xs={10} sx={{ mb: -3.5 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title8}
                      </DialogTitle>
                    </Grid>
                    {version?.map((data, index) => (
                      <>
                        <Grid item key={index}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={data.name}
                                checked={checkboxValues[data.name]}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {checkboxValues?.versions == true ? (
                      <>
                        {versionfield?.map((data, index) => (
                          <>
                            <Grid item xs={4} key={index}>
                              <TextField
                                fullWidth
                                size="small"
                                type={data.type}
                                name={data.name}
                                variant="outlined"
                                value={addPolicies.name}
                                label={data.placeholder}
                                onChange={handleShareData}
                                defaultValue={addPolicies[data.name]}
                                inputProps={{
                                  style: {
                                    paddingTop: "5px",
                                  },
                                }}
                              />
                            </Grid>
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
                {addPolicies.policy_type == "Data Room" ? (
                  <>
                    {/* File Extension */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title2}
                      </DialogTitle>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        value={editedTask}
                        onChange={handleInputChange}
                        placeholder={
                          editingIndex === null
                            ? "Enter File Extension"
                            : "Edit File Extension"
                        }
                        variant="outlined"
                        sx={{ mr: 0.5 }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={
                          editingIndex === null
                            ? addTask
                            : () => saveEdit(editingIndex)
                        }
                        style={{ marginRight: "3px" }}
                      >
                        {editingIndex === null ? "Add" : "Edit"}
                      </Button>
                      {editingIndex !== null && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={cancelEdit}
                        >
                          <Cancel />
                        </Button>
                      )}
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      border="1px solid grey"
                      ml={1.2}
                      mt={1}
                    >
                      {editExtension.map((task, index) => (
                        <Grid item xs={2.9} key={index} flexDirection="row">
                          <Stack flexDirection="row">
                            {task}
                            <Tooltip
                              title="Edit"
                              style={{ cursor: "pointer" }}
                              onClick={() => startEditing(index, task)}
                            >
                              <EditIcon sx={{ mr: 1 }} fontSize="small" />
                            </Tooltip>
                            <Tooltip
                              title="Delete"
                              style={{ cursor: "pointer" }}
                              onClick={() => removeTask(index)}
                            >
                              <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                            </Tooltip>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                    {/* BandWidth */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title5}
                      </DialogTitle>
                    </Grid>
                    {BandWidth?.map((data, index) => (
                      <>
                        <Grid item xs={4} key={index}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            value={addPolicies.name}
                            label={data.placeholder}
                            onChange={handleShareData}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        Select Date
                      </DialogTitle>
                    </Grid>
                    <Grid item xs={4.3}>
                      <DatePicker
                        selected={addPolicies.startDate}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Start Date"
                        onChange={(date) => handleDateChange(date, "startDate")}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <DatePicker
                        selected={addPolicies.endDate}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="End Date"
                        onChange={(date) => handleDateChange(date, "endDate")}
                      />
                    </Grid>
                    {/* recyclebin */}
                    <Grid item xs={10} sx={{ mb: -3.5 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title7}
                      </DialogTitle>
                    </Grid>
                    {recyclebin?.map((data, index) => (
                      <>
                        <Grid item key={index}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={data.name}
                                checked={checkboxValues[data.name]}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {checkboxValues?.recycle_bin == true ? (
                      <>
                        {recyclebinfield?.map((data, index) => (
                          <>
                            <Grid item xs={4} key={index}>
                              <TextField
                                fullWidth
                                size="small"
                                type={data.type}
                                name={data.name}
                                variant="outlined"
                                value={addPolicies.name}
                                label={data.placeholder}
                                onChange={handleShareData}
                                defaultValue={addPolicies[data.name]}
                                inputProps={{
                                  style: {
                                    paddingTop: "7px",
                                  },
                                }}
                              />
                            </Grid>
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    {/* version */}
                    <Grid item xs={10} sx={{ mb: -3.5 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title8}
                      </DialogTitle>
                    </Grid>
                    {version?.map((data, index) => (
                      <>
                        <Grid item key={index}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={data.name}
                                checked={checkboxValues[data.name]}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {checkboxValues?.versions == true ? (
                      <>
                        {versionfield?.map((data, index) => (
                          <>
                            <Grid item xs={4} key={index}>
                              <TextField
                                fullWidth
                                size="small"
                                type={data.type}
                                name={data.name}
                                variant="outlined"
                                value={addPolicies.name}
                                label={data.placeholder}
                                onChange={handleShareData}
                                defaultValue={addPolicies[data.name]}
                                inputProps={{
                                  style: {
                                    paddingTop: "5px",
                                  },
                                }}
                              />
                            </Grid>
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </Grid>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button id="closeBtn" variant="outlined" onClick={handleClose}>
            {buttonCancelTitle}
          </Button>
          <Button id="submitBtn" onClick={onFormSubmit}>
            {buttonSuccessTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
