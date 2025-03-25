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
  Snackbar,
  Alert,
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
import axios from "axios";

interface ILoginFormInputs {    
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: { main: "#4CAF50" },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {                                                                                 
            background: isDarkMode
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

  const handleFormSubmit: SubmitHandler<ILoginFormInputs> = async (data) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      const response = await axios.post("/api/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); 
        setSuccessMessage("Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) { 
      console.error("Login error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred during login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDarkModeToggle = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  const handleErrorClose = (): void => {
    setErrorMessage(null);
  };

  const handleSuccessClose = (): void => {
    setSuccessMessage(null);
  };

  const handleSignUpClick = (): void => {
    navigate("/signup");
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
          onClick={handleDarkModeToggle}
          sx={{ position: "absolute", top: 20, right: 20 }}
          color="inherit"
        >
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
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

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box mt={3} mb={2}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.5, borderRadius: "10px" }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Login"}
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
              onClick={handleSignUpClick}
            >
              Sign Up
            </span>
          </Typography>
        </Paper>

        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={handleErrorClose}
        >
          <Alert severity="error" onClose={handleErrorClose}>
            {errorMessage}
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={handleSuccessClose}
        >
          <Alert severity="success" onClose={handleSuccessClose}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
