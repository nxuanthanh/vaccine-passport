import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Layout, Login, User, UserCreate } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/create" element={<UserCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
