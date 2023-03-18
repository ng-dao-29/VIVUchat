import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/page/Home";
import Login from "./components/page/Login";
import CheckToken from "./components/authHandel/CheckToken";
import ShowChat from "./components/Chat/ShowChat";
import Register from "./components/page/Register";
function App() {
    return (
        <Routes>
            <Route path="/" element={
                <CheckToken>
                    <Home/>
                </CheckToken>
            }/>
            <Route path="/chat/:id" element={
                <CheckToken>
                    <Home>
                        <ShowChat/>
                    </Home>
                </CheckToken>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    );
}

export default App;
