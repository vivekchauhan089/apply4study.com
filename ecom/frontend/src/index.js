import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./reset.css";
import "antd/dist/antd";
import App from "./App";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { BasketProvider } from "./contexts/BasketContext";
import { BrowserRouter } from "react-router-dom";

const theme = extendTheme({
  colors: {
    whatsapp: {
      50:  "#e9f5ee",
      100: "#d0ebd9",
      200: "#a6d8b8",
      300: "#7bc596",
      400: "#4fa275",
      500: "#25D366", // main green
      600: "#1da851",
      700: "#167d3b",
      800: "#0e5226",
      900: "#062911",
    },
    facebook: {
      50:  "#e8f4f9",
      100: "#d9dee9",
      200: "#b7c2da",
      300: "#6482c0",
      400: "#4267B2", // brand blue
      500: "#385898",
      600: "#314e89",
      700: "#29487d",
      800: "#223b67",
      900: "#1e355b",
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <BasketProvider>
            <App />
          </BasketProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
