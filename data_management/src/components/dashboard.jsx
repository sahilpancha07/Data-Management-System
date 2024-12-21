import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  createTheme,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/view")
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

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

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{ title: "Data Of Members" }}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Card sx={{ maxWidth: 345, margin: 3 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Total Members
              </Typography>
              <Typography
                style={{ fontSize: 35 }}
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                <b>{data.length}</b>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </DashboardLayout>
    </AppProvider>
  );
}
