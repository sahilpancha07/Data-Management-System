import React, { useEffect, useState } from "react";

import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  createTheme,
  Fade,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import DataUsageIcon from "@mui/icons-material/DataUsage";
// import { useDemoRouter } from "@toolpad/core/internal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewData() {
  // const router = useDemoRouter("/view");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({});
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
    {
      segment: "data",
      title: "Data",
      icon: <DataUsageIcon />,
      onClick: () => navigate("/data"),
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

  const styleView = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // const handleDelete = (row) => {
  //   setSelectedRow(row); // Store the selected row
  //   setOpen(true); // Open the modal
  //   console.log("Selected Row for Delete:", row);
  // };

  const handleEdit = (row) => {
    setSelectedRow(row); 
    console.log("Selected Row for Edit:", row);
  };

  const handleDeleteConfirm = () => {
    console.log("eeeeeeeeeee")
    axios
      .delete(`http://localhost:5000/delete-family/${selectedRow.no}`)
      .then((response) => {
        console.log(response.data.message);
        setOpen(false);
        setData((prevData) =>
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
        setLoading(false);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/view")
  //     .then((response) => {
  //       setData(response.data.data);
  //       setLoading(false);
  //       console.log(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     });
  // }, [data]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      // router={router}
      branding={{
        title: "Data Of Members",
      }}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Grid2 mt={3}>
          <Card mt={2}>
            <CardContent sx={{ margin: 0 }}>
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
                        <b>Operations</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((e) => {
                      return (
                        <>
                          <TableRow key={e.no}>
                            <TableCell align="center">{e.no}</TableCell>
                            <TableCell align="center">
                              {e.main_member_family}
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
                    })}
                  </TableBody>
                </Table>
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
          onClose={handleClose}
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
                      {/* {selectedRow.map((e) => {
                        return (
                          <>
                            <TableBody>
                              <TableRow>
                                <TableCell align="center">No</TableCell>
                                <TableCell align="center">{e.No}</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="center">Zone</TableCell>
                                <TableCell align="center">{e.zone}</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="center">Contact</TableCell>
                                <TableCell align="center"></TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="center">
                                  Main Member of Family
                                </TableCell>
                                <TableCell align="center">ABCD</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="center">
                                  Annual Income
                                </TableCell>
                                <TableCell align="center">100000</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="center">Bhavnagar</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="center">
                                  Economic Position
                                </TableCell>
                                <TableCell align="center">Good</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="center">House</TableCell>
                                <TableCell align="center">Own</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="center">Cards</TableCell>
                                <TableCell align="center">
                                  <List>
                                    <ListItem>
                                      <ListItemText>ABCD</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                      <ListItemText>ABCD</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                      <ListItemText>ABCD</ListItemText>
                                    </ListItem>
                                  </List>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </>
                        );
                      })} */}
                    </Table>
                  </Stack>
                </Grid2>
              </TableContainer>
            </Box>
          </Fade>
        </Modal>
      </div>
    </AppProvider>
  );
}
