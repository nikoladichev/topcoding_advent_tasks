import React from 'react';
import './App.css';
import {Quiz} from "./Quiz";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Quiz question={"What are your interests?"}
                      answers={["Software Development", "Personal Finance", "Career Development", "Personal Growth"]} />
            </header>
        </div>
);
}

export default App;
