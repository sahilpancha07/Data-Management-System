import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  createTheme,
  FormControl,
  Grid2,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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

export default function RegisterForm() {
  const [cardName, setCardName] = React.useState([]);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    No: Yup.string()
      .required("No is required")
      .matches(/^\d+$/, "No must be a number"),
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
          // Physical_handicap_disease: Yup.string().optional("Required"),
          contact: Yup.string().required("Required"),
          education: Yup.string().required("Required"),
          marritial_status: Yup.string().required("Required"),
          job_business: Yup.string().required("Required"),
          blood_grp: Yup.string().required("Required"),
        })
      )
      .required("At least one member is required"),
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

  const formik = useFormik({
    initialValues: {
      No: "",
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
        const response = await axios.post('http://localhost:5000/register', values);
        console.log('Form Submitted Successfully:', response.data);
        toast.success("Data Submitted Successfully", {position: "bottom-left",autoClose: 5000 });
        
      } catch (error) {
        console.error('Error Submitting Form:', error);
        toast.error("Error !!", { position: "bottom-left",autoClose: 5000 });
      }
    }
  
  });


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setCardName(
      typeof value === "string" ? value.split(",") : value
    );
    formik.setFieldValue(
      "card",
      typeof value === "string" ? value.split(",") : value
    );
  };

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
    }
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

  return (
    
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        title: "Sunni Sorathiya Muslim Ghachi Samaj",
      }}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Grid2 mt={3}>
          <Card mt={2}>
          <ToastContainer />
            <CardContent sx={{ margin: 1 }}>
              <Typography gutterBottom variant="h4" component="div">
                Add Family Details
              </Typography>

              <form onSubmit={formik.handleSubmit}>
                <Stack my={2} spacing={3} direction="row">
                  <TextField
                    id="outlined-basic"
                    type="number"
                    label="No."
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.No}
                    error={formik.touched.No && Boolean(formik.errors.No)}
                    helperText={formik.touched.No && formik.errors.No}
                    name="No"
                  />

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
                              value={formik.values.addMember.name}
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
                              value={formik.values.addMember.age}
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
                              value={formik.values.addMember.relation}
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
                              value={formik.values.addMember.contact}
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
                                formik.values.addMember.job_business
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
                              value={formik.values.addMember.blood_grp}
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
                              value={formik.values.addMember.education}
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

                            {formik.values.addMember.length > 1 && <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleRemoveMember(index)}
                              // disabled={formik.values.addMember.length === 1}
                            >
                              -
                            </Button>}
                          </Grid2>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </Grid2>
                <Grid2>
                  <Button type="submit" variant="contained" fullWidth>

                    Submit
                  </Button>
                </Grid2>
              </form>
            </CardContent>
          </Card>
        </Grid2>
      </DashboardLayout>
    </AppProvider>
  );
}
