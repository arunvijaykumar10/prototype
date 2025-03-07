import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import {
  Google,
  GitHub,
  WhatsApp,
  Facebook,
  Instagram,
  Twitter,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#4CAF50" },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            background: darkMode
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);

    setTimeout(() => {
      if (data.email === "arunkumar@dry.com" && data.password === "asdfghjkl") {
        console.log("User Logged In:", data);
        // alert("Login Successful!");
        navigate("/dashboard"); // Redirect to Dashboard
      } else {
        alert("Invalid email or password!"); // Show error message
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          sx={{ position: "absolute", top: 20, right: 20 }}
          color="inherit"
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        <Paper elevation={3} sx={{ textAlign: "center", p: 4, width: "100%" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Your Journey to Perfect Gifting Starts Here!
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Sign in to continue
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mt={3} mb={2}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>

            <Box mb={2}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.5, borderRadius: "10px" }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>

          <Box mt={3}>
            <Typography variant="body2" color="textSecondary">
              Or Sign in with
            </Typography>
            <Box mt={2} display="flex" justifyContent="center">
              <IconButton color="primary">
                <Google fontSize="large" />
              </IconButton>
              <IconButton color="inherit">
                <GitHub fontSize="large" />
              </IconButton>
              <IconButton color="primary">
                <WhatsApp fontSize="large" />
              </IconButton>
              <IconButton color="inherit">
                <Facebook fontSize="large" />
              </IconButton>
              <IconButton color="primary">
                <Instagram fontSize="large" />
              </IconButton>
              <IconButton color="inherit">
                <Twitter fontSize="large" />
              </IconButton>
            </Box>
          </Box>

          <Typography variant="body2" mt={2}>
            Don't have an account?{" "}
            <span
              style={{
                color: "#4CAF50",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </span>
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
