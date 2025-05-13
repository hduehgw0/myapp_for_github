import "./styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "./router/Router";
import { BrowserRouter } from "react-router-dom";

export const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
};
