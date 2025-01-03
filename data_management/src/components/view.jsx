import React, { useEffect, useState } from "react";

import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  createTheme,
  Fade,
  FormControl,
  Grid2,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewData() {
  // const router = useDemoRouter("/view");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({});
  const [cardName, setCardName] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredData, setFilteredData] = React.useState([]); // State for filtered results
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  // Calculate total pages
  // const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    // Calculate start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Update the data to display
    setPaginatedData(data.slice(startIndex, endIndex));
  }, [currentPage, data]);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

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

  const cards = [
    "Amrut Card",
    "Vatsal Card",
    "Election Card",
    "Pan Card",
    "Aadhar Card",
    "Cast Certificate",
    "Identity Card",
  ];

  const handleOpen = (row) => {
    setOpen(true);
    setSelectedRow(row);
    console.log("Selected Row for delete:", row.no);
  };

  const handleOpenView = (row) => {
    setOpenView(true);
    setSelectedRow(row); // Store the selected row
    console.log("Selected Row for view:", row);
  };
  const handleClose = () => setOpen(false);
  const handleCloseView = () => setOpenView(false);
  const handleCloseEdit = () => setOpenEdit(false);

  const navigate = useNavigate();

  const NAVIGATION = [
    {
      segment: "dashboard",
      title: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => navigate("/dashboard"),
    },
    {
      segment: "register",
      title: "Register",
      icon: <PermIdentityIcon />,
      onClick: () => navigate("/register"),
    },
    {
      segment: "view",
      title: "View",
      icon: <ViewCompactIcon />,
      onClick: () => navigate("/view"),
    },
  ];

  const demoTheme = createTheme({
    cssVariables: {
      colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const handleChangeInput = (event, index) => {
    const { name, value } = event.target;

    // Update only the specific field in addMember
    const updatedMembers = [...formik.values.addMember];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [name.split(".").slice(-1)[0]]: value, // Extract field name and update
    };

    formik.setFieldValue("addMember", updatedMembers); // Update Formik state
  };

  const handleAddMember = () => {
    formik.setFieldValue("addMember", [
      ...formik.values.addMember,
      {
        name: "",
        age: "",
        relation: "",
        xender: "",
        contact: "",
        education: "",
        marritial_status: "",
        job_business: "",
        blood_grp: "",
      },
    ]);
  };

  const handleRemoveMember = (index) => {
    const newMembers = [...formik.values.addMember];
    newMembers.splice(index, 1); // Remove member at `index`
    formik.setFieldValue("addMember", newMembers);
  };

  const validationSchema = Yup.object({
    zone: Yup.string().required("Zone is required"),
    main_member_contact: Yup.string()
      .required("Contact is required")
      .matches(/^\d{10}$/, "Enter a valid 10-digit contact number"),
    address: Yup.string().required("Address is required"),
    economic_position: Yup.string().required("Economic position is required"),
    annual_income: Yup.number()
      .required("Annual income is required")
      .positive("Annual income must be positive"),
    main_member_family: Yup.string().required("Name is required"),
    house: Yup.string().required("House is required"),
    card: Yup.array()
      .min(1, "Please select at least one card")
      .required("Card is required"),
    addMember: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Required"),
          age: Yup.number().required("Required"),
          relation: Yup.string().required("Required"),
          xender: Yup.string().required("Required"),
          contact: Yup.string().required("Required"),
          education: Yup.string().required("Required"),
          marritial_status: Yup.string().required("Required"),
          job_business: Yup.string().required("Required"),
          blood_grp: Yup.string().required("Required"),
        })
      )
      .required("At least one member is required"),
  });

  const formik = useFormik({
    initialValues: {
      zone: "",
      main_member_contact: "",
      main_member_family: "",
      address: "",
      economic_position: "",
      house: "",
      annual_income: "",
      card: [],
      addMember: [
        {
          name: "",
          age: "",
          relation: "",
          xender: "",
          contact: "",
          education: "",
          marritial_status: "",
          job_business: "",
          blood_grp: "",
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = {
          zone: formik.values.zone,
          main_member_contact: formik.values.main_member_contact,
          main_member_family: formik.values.main_member_family,
          annual_income: formik.values.annual_income,
          address: formik.values.address,
          economic_position: formik.values.economic_position,
          house: formik.values.house,
          card: formik.values.card,
          addMember: formik.values.addMember,
        };
        const response = await axios.put(
          `http://localhost:5000/edit-family/${selectedRow.no}`,
          formData,
          
        );
        console.log("Form Submitted Successfully:", response.data);
        if (response.data.status) {
          setOpenEdit(false); // Show success message
          toast.success("Data Editted Successfully", {position: "bottom-left",autoClose: 5000 });
        } else {
          alert("Update failed: " + response.data.message);
          toast.error("Error !!", {position: "bottom-left",autoClose: 5000 });
        }
      } catch (error) {
        console.error("API Error:", error);
        alert("Failed to update data. Please try again.");
      }
    },
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setCardName(typeof value === "string" ? value.split(",") : value);
    formik.setFieldValue(
      "card",
      typeof value === "string" ? value.split(",") : value
    );
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const styleEdit = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    maxHeight: "80vh", // Limit the height of the modal
    overflowY: "auto", // Enable vertical scrolling
    p: 4,
  };

  const styleView = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    maxHeight: "80vh", // Limit the height of the modal
    overflowY: "auto", // Enable vertical scrolling
    p: 4,
  };

  const handleEdit = (row) => {
    setOpenEdit(true); // Open the modal
    setSelectedRow(row); // Store the selected row

    // Map `addMember` values if they exist in the row
    const mappedMembers = row.add_member.map((member) => ({
      name: member.name,
      age: member.age,
      relation: member.relation,
      xender: member.xender,
      contact: member.contact || "",
      education: member.education || "",
      marritial_status: member.marritial_status,
      job_business: member.job_business || "",
      blood_grp: member.blood_grp || "",
    }));

    formik.setValues({
      zone: row.zone || "",
      main_member_contact: row.main_member_contact || "",
      main_member_family: row.main_member_family || "",
      address: row.address || "",
      economic_position: row.economic_position || "",
      house: row.house || "",
      annual_income: row.annual_income || "",
      card: row.card || [],
      addMember: mappedMembers,
    });

    console.log("Selected Row for Edit:", row);
    console.log(mappedMembers);
    console.log("row.add_member:", row.add_member);
  };

  const handleDeleteConfirm = () => {
    console.log("eeeeeeeeeee");
    axios
      .delete(`http://localhost:5000/delete-family/${selectedRow.id}`)
      .then((response) => {
        console.log(response.data.message);
        setOpen(false);
        setData((prevData) =>
          prevData.filter((item) => item.No !== selectedRow.No)
        );
        setFilteredData((prevData) =>
          prevData.filter((item) => item.No !== selectedRow.No)
        );
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });

    axios
      .get("http://localhost:5000/view")
      .then((response) => {
        setData(response.data.data);
        setFilteredData(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/view")
      .then((response) => {
        setData(response.data.data);
        setFilteredData(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(data);
    } else {
      const query = searchQuery.toLowerCase();
      const results = data.filter(
        (item) =>
          item.main_member_family.toLowerCase().includes(query) ||
          item.zone.toLowerCase().includes(query) ||
          item.main_member_contact.includes(query) ||
          item.address.toLowerCase().includes(query) ||
          item.economic_position.toLowerCase().includes(query) ||
          item.house.toLowerCase().includes(query) ||
          item.card.some((card) => card.toLowerCase().includes(query)) ||
          item.add_member.some((member) =>
            Object.values(member).some(
              (field) =>
                typeof field === "string" && field.toLowerCase().includes(query)
            )
          )
      );
      setFilteredData(results);
    }
  }, [searchQuery, data]);

  const labels = {
    no: "Serial Number",
    zone: "Zone",
    main_member_contact: "Contact Number",
    main_member_family: "Main Family Member",
    annual_income: "Annual Income",
    address: "Address",
    economic_position: "Economic Position",
    house: "House",
    card: "Cards",
    add_member: "Family Members",
    age: "Age",
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      // router={router}
      branding={{
        title: "Sunni Sorathiya Muslim Ghachi Samaj",
      }}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Grid2 mt={3}>
          <Card mt={2}>
            <CardContent sx={{ margin: 0 }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: "10px", marginBottom: "20px", width: "25%" }}
              />
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow key={data.No}>
                      <TableCell align="center">
                        <b>No</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Name</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Contact</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Operations</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((e, index) => {
                        return (
                          <>
                            <TableRow key={index}>
                              <TableCell align="center">{e.no}</TableCell>
                              <TableCell align="center">
                                {e.main_member_family}
                              </TableCell>
                              <TableCell align="center">
                                {e.main_member_contact}
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  sx={{ marginRight: 1 }}
                                  variant="contained"
                                  onClick={() => handleOpenView(e)}
                                >
                                  View
                                </Button>

                                <Button
                                  variant="contained"
                                  onClick={() => handleEdit(e)}
                                >
                                  Edit
                                </Button>

                                <Button
                                  sx={{ marginLeft: 1 }}
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleOpen(e)}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })
                    ) : (
                      <p> No data Found.........</p>
                    )}
                  </TableBody>
                </Table>

                {/* Pagination Controls */}
                {/* <div style={{ marginTop: "10px" }}>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      disabled={currentPage === index + 1}
                      style={{
                        margin: "0 5px",
                        padding: "5px 10px",
                        background:
                          currentPage === index + 1 ? "#ccc" : "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div> */}
              </TableContainer>
            </CardContent>
          </Card>
        </Grid2>
      </DashboardLayout>

      <div className="">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Are You Sure You Want to delete ?
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  sx={{ marginLeft: 1 }}
                  variant="contained"
                  color="error"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </Button>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>

      <div className="">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openView}
          onClose={handleCloseView}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openView}>
            <Box sx={styleView}>
              <TableContainer>
                <Grid2>
                  <Stack>
                    <Button
                      variant="contained"
                      onClick={() => setOpenView(false)}
                    >
                      Back
                    </Button>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <b>Field</b>
                          </TableCell>
                          <TableCell align="center">
                            <b>Value</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(selectedRow).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell align="center">
                              {labels[key] || key}
                            </TableCell>
                            <TableCell align="center">
                              {Array.isArray(value)
                                ? key === "add_member"
                                  ? value.map((member, index) => (
                                      <div key={index} my={1}>
                                        <b>Member {index + 1}:</b>
                                        <ul
                                          style={{
                                            textAlign: "left",
                                            margin: "0",
                                          }}
                                        >
                                          {Object.entries(member).map(
                                            ([memberKey, memberValue]) => (
                                              <li key={memberKey}>
                                                <b>{memberKey}:</b>{" "}
                                                {memberValue}
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    ))
                                  : value.join(", ")
                                : value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Stack>
                </Grid2>
              </TableContainer>
            </Box>
          </Fade>
        </Modal>
      </div>

      <div className="">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openEdit}
          onClose={handleCloseEdit}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openEdit}>
            <Box sx={styleEdit}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Edit User Data
              </Typography>
              <ToastContainer />

              <form onSubmit={formik.handleSubmit}>
                <Stack my={2} spacing={3} direction="row">
                  <TextField
                    id="outlined-basic"
                    type="text"
                    label="Zone"
                    name="zone"
                    value={formik.values.zone}
                    onChange={formik.handleChange}
                    variant="outlined"
                    error={formik.touched.zone && Boolean(formik.errors.zone)}
                    helperText={formik.touched.zone && formik.errors.zone}
                  />

                  <TextField
                    id="outlined-basic"
                    type="number"
                    label="Contact"
                    name="main_member_contact"
                    variant="outlined"
                    value={formik.values.main_member_contact}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.main_member_contact &&
                      Boolean(formik.errors.main_member_contact)
                    }
                    helperText={
                      formik.touched.main_member_contact &&
                      formik.errors.main_member_contact
                    }
                  />

                  <TextField
                    sx={{ width: 400 }}
                    id="outlined-basic"
                    type="text"
                    label="Main Member Of Family"
                    name="main_member_family"
                    onChange={formik.handleChange}
                    value={formik.values.main_member_family}
                    variant="outlined"
                    error={
                      formik.touched.main_member_family &&
                      Boolean(formik.errors.main_member_family)
                    }
                    helperText={
                      formik.touched.main_member_family &&
                      formik.errors.main_member_family
                    }
                  />

                  <TextField
                    sx={{ marginLeft: 2, width: 300 }}
                    id="outlined-basic"
                    type="number"
                    label="Anual Income"
                    name="annual_income"
                    variant="outlined"
                    value={formik.values.annual_income}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.annual_income &&
                      Boolean(formik.errors.annual_income)
                    }
                    helperText={
                      formik.touched.annual_income &&
                      formik.errors.annual_income
                    }
                  />
                </Stack>

                <Grid2>
                  <Stack my={2} spacing={2} direction={"row"}>
                    <TextField
                      id="outlined-basic"
                      type="text"
                      label="Address"
                      variant="outlined"
                      style={{ width: 500 }}
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                      multiline
                    />

                    <FormControl
                      sx={{ width: 225 }}
                      error={
                        formik.touched.economic_position &&
                        Boolean(formik.errors.economic_position)
                      }
                    >
                      <InputLabel id="demo-simple-select-label">
                        Economic Position
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Economic Position"
                        name="economic_position"
                        onChange={formik.handleChange}
                        value={formik.values.economic_position || ""}
                      >
                        <MenuItem value={"good"}>Good</MenuItem>
                        <MenuItem value={"medium"}>Medium</MenuItem>
                        <MenuItem value={"bad"}>Bad</MenuItem>
                      </Select>
                      {formik.touched.economic_position &&
                        formik.errors.economic_position && (
                          <Typography variant="caption" color="error">
                            {formik.errors.economic_position}
                          </Typography>
                        )}
                    </FormControl>
                    <FormControl
                      sx={{ marginLeft: 2, width: 225 }}
                      error={
                        formik.touched.house && Boolean(formik.errors.house)
                      }
                    >
                      <InputLabel id="demo-simple-select-label">
                        House
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="House"
                        name="house"
                        onChange={formik.handleChange}
                        value={formik.values.house || ""}
                      >
                        <MenuItem value={"own"}>Own</MenuItem>
                        <MenuItem value={"rental"}>Rental</MenuItem>
                        <MenuItem value={"deposite"}>Deposite</MenuItem>
                      </Select>
                      {formik.touched.house && formik.errors.house && (
                        <Typography variant="caption" color="error">
                          {formik.errors.house}
                        </Typography>
                      )}
                    </FormControl>

                    <FormControl
                      error={formik.touched.card && Boolean(formik.errors.card)}
                      sx={{ marginLeft: 2, width: 225 }}
                    >
                      <InputLabel id="demo-multiple-checkbox-label">
                        Card
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        // value={cardName}
                        value={formik.values.card || []}
                        name="card"
                        onChange={(e) => {
                          handleChange(e);
                          formik.handleChange(e);
                        }}
                        input={<OutlinedInput label="Cards" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {cards.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={cardName.includes(name)} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.card && formik.errors.card && (
                        <Typography variant="caption" color="error">
                          {formik.errors.card}
                        </Typography>
                      )}
                    </FormControl>
                  </Stack>
                </Grid2>

                <Grid2>
                  {formik.values.addMember.map((field, index) => (
                    <div key={index} style={{ marginBottom: "16px" }}>
                      <Card style={{ border: "1px solid black" }}>
                        <CardContent>
                          <Grid2 my={2} mx={2} sx={{ margin: 2 }}>
                            <TextField
                              sx={{ mb: 2 }}
                              type="text"
                              label="Family Member Name"
                              name={`addMember.${index}.name`}
                              value={formik.values.addMember?.[index]?.name}
                              onChange={(event) => {
                                formik.handleChange(event);
                                handleChangeInput(event, index);
                              }}
                              variant="outlined"
                              multiline
                              style={{ marginRight: "8px" }}
                              error={Boolean(
                                formik.touched.addMember?.[index]?.name &&
                                  formik.errors.addMember?.[index]?.name
                              )}
                              helperText={
                                formik.touched.addMember?.[index]?.name &&
                                formik.errors.addMember?.[index]?.name
                              }
                            />

                            <TextField
                              type="number"
                              label="Age"
                              name={`addMember.${index}.age`}
                              value={formik.values.addMember?.[index]?.age}
                              onChange={(event) => {
                                formik.handleChange(event);
                                handleChangeInput(event, index);
                              }}
                              variant="outlined"
                              multiline
                              style={{ marginRight: "8px" }}
                              error={Boolean(
                                formik.touched.addMember?.[index]?.age &&
                                  formik.errors.addMember?.[index]?.age
                              )}
                              helperText={
                                formik.touched.addMember?.[index]?.age &&
                                formik.errors.addMember?.[index]?.age
                              }
                            />

                            <TextField
                              type="text"
                              label="Relation"
                              name={`addMember.${index}.relation`}
                              value={formik.values.addMember?.[index]?.relation}
                              onChange={(event) => {
                                formik.handleChange(event);
                                handleChangeInput(event, index);
                              }}
                              variant="outlined"
                              multiline
                              style={{ marginRight: "8px" }}
                              error={Boolean(
                                formik.touched.addMember?.[index]?.relation &&
                                  formik.errors.addMember?.[index]?.relation
                              )}
                              helperText={
                                formik.touched.addMember?.[index]?.relation &&
                                formik.errors.addMember?.[index]?.relation
                              }
                            />

                            <TextField
                              type="number"
                              label="Contact"
                              name={`addMember.${index}.contact`}
                              value={formik.values.addMember?.[index]?.contact}
                              onChange={(event) => {
                                formik.handleChange(event);
                                handleChangeInput(event, index);
                              }}
                              variant="outlined"
                              multiline
                              error={Boolean(
                                formik.touched.addMember?.[index]?.contact &&
                                  formik.errors.addMember?.[index]?.contact
                              )}
                              helperText={
                                formik.touched.addMember?.[index]?.contact &&
                                formik.errors.addMember?.[index]?.contact
                              }
                            />

                            <TextField
                              type="text"
                              label="Job / Business"
                              name={`addMember.${index}.job_business`}
                              value={
                                formik.values.addMember?.[index]?.job_business
                              }
                              onChange={(event) => {
                                formik.handleChange(event);
                                handleChangeInput(event, index);
                              }}
                              variant="outlined"
                              multiline
                              style={{ marginLeft: 12, marginRight: 12 }}
                              error={Boolean(
                                formik.touched.addMember?.[index]
                                  ?.job_business &&
                                  formik.errors.addMember?.[index]?.job_business
                              )}
                              helperText={
                                formik.touched.addMember?.[index]
                                  ?.job_business &&
                                formik.errors.addMember?.[index]?.job_business
                              }
                            />

                            <TextField
                              type="text"
                              label="Blood Group"
                              name={`addMember.${index}.blood_grp`}
                              value={
                                formik.values.addMember?.[index]?.blood_grp
                              }
                              onChange={(event) => {
                                formik.handleChange(event);
                                handleChangeInput(event, index);
                              }}
                              variant="outlined"
                              multiline
                              style={{ marginRight: "8px" }}
                              error={Boolean(
                                formik.touched.addMember?.[index]?.blood_grp &&
                                  formik.errors.addMember?.[index]?.blood_grp
                              )}
                              helperText={
                                formik.touched.addMember?.[index]?.blood_grp &&
                                formik.errors.addMember?.[index]?.blood_grp
                              }
                            />

                            <TextField
                              type="text"
                              label="Education"
                              name={`addMember.${index}.education`}
                              value={
                                formik.values.addMember?.[index]?.education
                              }
                              onChange={(event) => {
                                formik.handleChange(event);
                                handleChangeInput(event, index);
                              }}
                              variant="outlined"
                              multiline
                              style={{ marginRight: "8px" }}
                              error={Boolean(
                                formik.touched.addMember?.[index]?.education &&
                                  formik.errors.addMember?.[index]?.education
                              )}
                              helperText={
                                formik.touched.addMember?.[index]?.education &&
                                formik.errors.addMember?.[index]?.education
                              }
                            />

                            <FormControl
                              sx={{ width: 300 }}
                              error={
                                formik.touched.addMember?.[index]?.xender &&
                                Boolean(
                                  formik.errors.addMember?.[index]?.xender
                                )
                              }
                            >
                              <InputLabel id="demo-simple-select-label">
                                Xender
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Xender"
                                name={`addMember.${index}.xender`}
                                value={
                                  formik.values.addMember?.[index]?.xender || ""
                                }
                                onChange={formik.handleChange}
                                // value={field.xender}
                              >
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                              </Select>
                              {formik.touched.addMember?.[index]?.xender &&
                                formik.errors.addMember?.[index]?.xender && (
                                  <Typography variant="caption" color="error">
                                    {formik.errors.addMember?.[index]?.xender}
                                  </Typography>
                                )}
                            </FormControl>
                            <FormControl
                              sx={{ marginLeft: 2, width: 300 }}
                              error={
                                formik.touched.addMember?.[index]
                                  ?.marritial_status &&
                                Boolean(
                                  formik.errors.addMember?.[index]
                                    ?.marritial_status
                                )
                              }
                              fullWidth
                            >
                              <InputLabel id="demo-simple-select-label">
                                Marritial Status
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Marritial Status"
                                name={`addMember.${index}.marritial_status`}
                                value={
                                  formik.values.addMember[index]
                                    .marritial_status || ""
                                }
                                onChange={formik.handleChange}
                                // value={field.marritial_status}
                              >
                                <MenuItem value={"married"}>Married</MenuItem>
                                <MenuItem value={"unmarried"}>
                                  Un Married
                                </MenuItem>
                              </Select>
                              {formik.touched.addMember?.[index]
                                ?.marritial_status &&
                                formik.errors.addMember?.[index]
                                  ?.marritial_status && (
                                  <Typography variant="caption" color="error">
                                    {
                                      formik.errors.addMember?.[index]
                                        ?.marritial_status
                                    }
                                  </Typography>
                                )}
                            </FormControl>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleAddMember}
                              sx={{ margin: 1 }}
                            >
                              +
                            </Button>

                            {formik.values.addMember.length > 1 && (
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleRemoveMember(index)}
                                disabled={formik.values.addMember.length === 1}
                              >
                                -
                              </Button>
                            )}
                          </Grid2>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </Grid2>
                <Grid2>
                  <Typography
                    id="transition-modal-description"
                    sx={{ mt: 2, justifyContent: "end" }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => setOpenEdit(false)}
                    >
                      Cancel
                    </Button>

                    <Button
                      sx={{ marginLeft: 1 }}
                      variant="contained"
                      color="info"
                      type="submit"
                    >
                      Edit
                    </Button>
                  </Typography>
                </Grid2>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    </AppProvider>
  );
}
