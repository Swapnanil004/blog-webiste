import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/create"
                    element={<CreatePost />}
                />

                <Route
                    path="/post/:id"
                    element={<PostDetails />}
                />

                <Route
                    path="/edit/:id"
                    element={<EditPost />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;