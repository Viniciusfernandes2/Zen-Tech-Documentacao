import { AuthProvider } from "../src/context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />
      </Router>
    </AuthProvider>
  );
}

export default App;
