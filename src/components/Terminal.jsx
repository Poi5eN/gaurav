import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SnakeGame from "./SnakeGame";

const Terminal = ({ isFullScreen, toggleFullScreen }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    { type: "info", content: "Welcome to Gaurav's Portfolio Terminal v1.0.0" },
    { type: "info", content: "Type 'help' to see available commands." },
  ]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Cleaner "GAURAV" ASCII Art
  const ASCII_ART = `
   ________  ________  ___  ___  ________  ________  ___      ___ 
  |\\   ____\\|\\   __  \\|\\  \\|\\  \\|\\   __  \\|\\   __  \\|\\  \\    /  /|
  \\ \\  \\___|\\ \\  \\|\\  \\ \\  \\\\\\  \\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\  /  / |
   \\ \\  \\  __\\ \\   __  \\ \\  \\\\\\  \\ \\   _  _\\ \\   __  \\ \\  \\/  / / 
    \\ \\  \\|\\  \\ \\  \\ \\  \\ \\  \\\\\\  \\ \\  \\\\  \\\\ \\  \\ \\  \\ \\    / /  
     \\ \\_______\\ \\__\\ \\__\\ \\_______\\ \\__\\\\ _\\\\ \\__\\ \\__\\ \\__/ /   
      \\|_______|\\|__|\\|__|\\|_______|\\|__|\\|__|\\|__|\\|__|\\|__|/    
`;

  const COMMANDS = {
    help: "List all available commands",
    cd: "Change directory, not really, lol!",
    ls: "List files in the current directory",
    mkdir: "Make a directory",
    clear: "Clears the terminal",
    cat: "Get a cute cat image.",
    echo: "Prints the given text to the console",
    about: "About Me.",
    twitter: "Opens my Twitter Handle.",
    github: "Opens my GitHub Profile.",
    discord: "Opens my Discord Account.",
    languages: "Languages I know.",
    skills: "Skills I have.",
    projects: "Projects I have worked on.",
    editor: "Details about my current editor",
    repo: "Opens this website's github repository.",
    spotify: "Get info about my recently played song.",
    sudo: "???",
    exit: "Exit fullscreen",
    snake: "Play Snake Game",
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [output, isGameActive]);

  useEffect(() => {
    if (isFullScreen || isGameActive) {
      inputRef.current?.focus();
    }
  }, [isFullScreen, isGameActive]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const commandLine = input.trim();
      if (!commandLine) return;

      const args = commandLine.split(" ");
      const command = args[0].toLowerCase();

      const newOutput = [...output, { type: "command", content: commandLine }];
      setHistory([...history, commandLine]);
      setHistoryIndex(-1);

      switch (command) {
        case "help":
          newOutput.push({
            type: "response",
            content: Object.entries(COMMANDS).map(([cmd, desc]) => ({
              cmd,
              desc,
            })),
            isHelp: true,
          });
          break;
        case "ls":
          newOutput.push({
            type: "response",
            content:
              "projects/  skills/  about.txt  contact.md  secret_plans.pdf",
          });
          break;
        case "cd":
          newOutput.push({
            type: "response",
            content: args[1]
              ? `Changed directory to ${args[1]} (just kidding)`
              : "Please specify a directory.",
          });
          break;
        case "mkdir":
          newOutput.push({
            type: "response",
            content: args[1]
              ? `Created directory ${args[1]}`
              : "Usage: mkdir <directory>",
          });
          break;
        case "cat":
          newOutput.push({
            type: "image",
            content: "https://cataas.com/cat/cute?width=300",
          }); // Random cute cat
          break;
        case "echo":
          newOutput.push({
            type: "response",
            content: args.slice(1).join(" "),
          });
          break;
        case "about":
          newOutput.push({
            type: "response",
            content:
              "I am Gaurav, a Full Stack Developer. I build intelligent systems.",
          });
          break;
        case "twitter":
        case "github":
        case "discord":
        case "repo":
          window.open("https://github.com/Poi5eN", "_blank"); // Placeholder for all links for now
          newOutput.push({
            type: "response",
            content: `Opening ${command}...`,
          });
          break;
        case "languages":
          newOutput.push({
            type: "response",
            content: "JavaScript, Python, C++, Java, Rust, Go",
          });
          break;
        case "skills":
          newOutput.push({
            type: "response",
            content: "React, Node.js, Three.js, Next.js, AI/ML",
          });
          break;
        case "projects":
          newOutput.push({
            type: "response",
            content:
              "Check out the Works section for my 3D portfolio projects!",
          });
          break;
        case "editor":
          newOutput.push({
            type: "response",
            content: "Visual Studio Code (Dark Mode, always)",
          });
          break;
        case "spotify":
          newOutput.push({
            type: "response",
            content: "Now Playing: 'Never Gonna Give You Up' - Rick Astley 🎵",
          });
          break;
        case "sudo":
          newOutput.push({
            type: "error",
            content:
              "Permission denied: user is not in the sudoers file. This incident will be reported.",
          });
          break;
        case "clear":
          setOutput([]);
          setInput("");
          return;
        case "snake":
          setIsGameActive(true);
          setInput("");
          return;
        case "exit":
          if (isFullScreen && toggleFullScreen) toggleFullScreen();
          newOutput.push({
            type: "response",
            content: isFullScreen
              ? "Exiting fullscreen..."
              : "Already in embedded mode.",
          });
          break;
        default:
          newOutput.push({
            type: "error",
            content: `Command not found: ${command}. Type 'help' for list.`,
          });
      }

      setOutput(newOutput);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter((cmd) =>
        cmd.startsWith(input)
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    } else if (e.key === "Escape") {
      setInput("");
    }
  };

  const closeGame = () => {
    setIsGameActive(false);
    setOutput((prev) => [
      ...prev,
      { type: "info", content: "Game Over. Returned to terminal." },
    ]);
  };

  const containerClasses = isFullScreen
    ? "fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
    : "relative w-full max-w-4xl mx-auto my-12 px-4";

  const windowClasses = isFullScreen
    ? "w-full max-w-5xl h-[85vh]"
    : "w-full h-[500px] shadow-[0_0_50px_rgba(0,0,0,0.5)]";

  return (
    <motion.div layout className={containerClasses}>
      <div
        className={`${windowClasses} bg-[#0c0c0c] flex flex-col rounded-xl overflow-hidden border border-[#333] shadow-2xl font-mono text-sm sm:text-base transition-all duration-300 relative group`}
      >
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-[#333]">
          <div className="flex gap-2 group-hover:opacity-100 opacity-50 transition-opacity duration-300">
            <div
              className="w-3 h-3 rounded-full bg-[#ff5f56]"
              onClick={() => isFullScreen && toggleFullScreen()}
              title="Close"
            />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div
              className="w-3 h-3 rounded-full bg-[#27c93f]"
              onClick={() => !isFullScreen && toggleFullScreen()}
              title="Maximize"
            />
          </div>
          <div className="text-gray-500 text-xs font-medium tracking-wide font-sans select-none absolute left-1/2 transform -translate-x-1/2">
            gaurav@portfolio — -zsh
          </div>
        </div>

        {/* Terminal Body */}
        <div
          className="flex-1 p-6 overflow-y-auto overflow-x-hidden text-[#e5e5e5] font-mono custom-scrollbar selection:bg-[#333] selection:text-white"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Custom Scrollbar Styles embedded for this component */}
          <style>{`
            .custom-scrollbar::-webkit-scrollbar { width: 10px; }
            .custom-scrollbar::-webkit-scrollbar-track { bg: #0c0c0c; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #333; border: 2px solid #0c0c0c; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #555; }
          `}</style>

          {!isGameActive && (
            <pre className="text-[6px] xs:text-[8px] sm:text-[10px] md:text-sm leading-[1.1] text-[#915EFF] font-bold mb-8 select-none opacity-90 whitespace-pre-wrap">
              {ASCII_ART}
            </pre>
          )}

          {isGameActive ? (
            <SnakeGame onExit={closeGame} />
          ) : (
            <>
              {output.map((line, i) => (
                <div key={i} className="mb-1 leading-relaxed break-words">
                  {line.type === "command" ? (
                    <div className="text-white mt-4 font-bold flex flex-row items-center">
                      <span className="text-[#915EFF] mr-2">
                        gaurav@/poi5en:~$
                      </span>
                      <span>{line.content}</span>
                    </div>
                  ) : line.type === "error" ? (
                    <div className="text-red-400 opacity-90">
                      {line.content}
                    </div>
                  ) : line.type === "image" ? (
                    <img
                      src={line.content}
                      alt="cat"
                      className="w-64 h-auto rounded-md my-2"
                    />
                  ) : line.isHelp ? (
                    <div className="grid grid-cols-[100px_1fr] md:grid-cols-[150px_1fr] gap-x-4 gap-y-1 mt-2 text-sm text-gray-300">
                      {line.content.map(({ cmd, desc }, idx) => (
                        <React.Fragment key={idx}>
                          <div className="text-[#27c93f]">{cmd}</div>
                          <div className="opacity-80">{desc}</div>
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-300 opacity-90 whitespace-pre-wrap">
                      {line.content}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-2 mt-4">
                <span className="text-[#915EFF] font-bold">
                  gaurav@/poi5en:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none flex-1 text-white caret-gray-400 font-bold"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>

              {/* Hints */}
              <div className="mt-8 pt-4 border-t border-gray-800 text-gray-600 text-xs flex gap-4 select-none">
                <span>[Tab] Auto-complete</span>
                <span>[Esc] Clear</span>
                <span>[↑][↓] History</span>
              </div>

              <div ref={bottomRef} className="pb-4" />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;
