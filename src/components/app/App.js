import AppHeader from "../appHeader/AppHeader";
import { Route, BrowserRouter as Router, Routes, } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";

const App = (props) => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="comics" element={<ComicsPage/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;