import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { Layout } from "./components/Layout";
import { CssBaseline } from "@mui/material";

export const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Layout />
    </Provider>
  );
};
