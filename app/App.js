import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import store from "./redux/store";
import RootCotainer from "./routes/RootCotainer";

export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <RootCotainer />
        <Toast visibilityTime={2000} />
      </Provider>
    </PaperProvider>
  );
}
