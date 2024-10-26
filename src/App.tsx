import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { Table } from "./components/Table";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Table />
    </ThemeProvider>
  );
}

export default App;
