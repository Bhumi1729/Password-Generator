import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_-+=[]{}`~";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const copyPassToClipboard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div
      className="flex items-center justify-center w-full h-screen bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://verpex.com/assets/uploads/images/blog/How-to-Make-Strong-Passwords-You-Can-Remember.webp?v=1690198067')`,
        backgroundBlendMode: "soft-light",
      }}
    >
      <div
        className="w-full max-w-lg bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-6 transform transition-all hover:scale-105 text-gray-300"
        style={{
          animation: "fade-in 0.8s ease-in-out",
        }}
      >
        <h1 className="text-4xl font-extrabold text-gray-100 text-center mb-6">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-6 border border-gray-500">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 text-gray-800 bg-gray-200 rounded-l-lg"
            placeholder="Generated Password"
            readOnly
            ref={passRef}
          />
          <button
            onClick={copyPassToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 font-semibold transition-all rounded-r-lg"
          >
            Copy
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-lg font-medium">
              Length: {length}
            </label>
            <input
              id="length"
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="numInput" className="text-lg font-medium">
              Include Numbers
            </label>
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numInput"
              className="cursor-pointer"
              onChange={() => setNumAllowed((prev) => !prev)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="charInput" className="text-lg font-medium">
              Include Special Characters
            </label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              className="cursor-pointer"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

export default App;
