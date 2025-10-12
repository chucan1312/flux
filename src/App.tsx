import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { CompleteProfile } from "./pages/CompleteProfile"
import { LogIn } from "./pages/LogIn";

import { Rooms } from "./pages/Rooms";
import { CreateRoom } from "./pages/CreateRoom"
import { JoinRoom } from "./pages/JoinRoom"

import { Dashboard } from "./pages/Dashboard/Dashboard";
import { NotFound } from "./pages/NotFound";
import { Overview } from "./pages/Dashboard/Overview";
import { Flashcards } from "./pages/Dashboard/Flashcards";
import { Documents } from "./pages/Dashboard/Documents";
import { FocusRoom } from "./pages/Dashboard/FocusRoom";
import { Discussion } from "./pages/Dashboard/Discussion";
import { Leaderboard } from "./pages/Dashboard/Leaderboard";

function App() {
    console.log("[App] render");
  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route index element={<Home />} />
           <Route path="/signup" element={<SignUp />}/>
           <Route path="/completeprofile" element={<CompleteProfile />}/>
           <Route path="/login" element={<LogIn />}/>
           <Route path="/rooms" element={<Rooms />} />
           <Route path="/createroom" element={<CreateRoom />} />
           <Route path="/joinroom" element={<JoinRoom />} />
           <Route path="*" element={<NotFound />}/>
           <Route path="/dashboard/:join_code" element={<Dashboard />}>
                <Route index element={<Overview />} />
                <Route path="documents" element={<Documents />} />
                <Route path="focusroom" element={<FocusRoom />} />
                <Route path="flashcards" element={<Flashcards />} />
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route path="discussion" element={<Discussion />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App