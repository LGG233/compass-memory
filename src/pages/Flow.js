// src/pages/Flow.js
import React, { useState, useEffect } from "react";
import MemoryCompanion from "../components/MemoryCompanion";
import RememberThis from "../components/RememberThis";
import { loadMemories, saveMemories } from "../utils/memoryStore";
import TodayTimeline from "../components/TodayTimeline";

const Flow = () => {
    const [mood, setMood] = useState("");
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [memories, setMemories] = useState(() => loadMemories());
    const [showArchived, setShowArchived] = useState(false);

    useEffect(() => {
        saveMemories(memories);
    }, [memories]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Temporary placeholder logic — this will later become AI-powered
        let reply = "Thanks for checking in.";
        if (mood === "tired") {
            reply += " Let’s protect your morning and ease into the day.";
        } else if (mood === "energized") {
            reply += " This might be a great day to tackle focused work.";
        } else if (mood === "meh") {
            reply += " Maybe keep the schedule light and build momentum slowly.";
        }

        setResponse(reply);
    };

    return (
        <div className="p-4 max-w-xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Morning Check-In</h1>

            <button
                onClick={() => setShowArchived(!showArchived)}
                className="text-sm text-indigo-600 underline hover:text-indigo-800 mb-2"
            >
                {showArchived ? "Hide Archived" : "Show Archived"}
            </button>

            <MemoryCompanion
                memories={memories}
                setMemories={setMemories}
                showArchived={showArchived}
            />

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Mood</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                    >
                        <option value="">Select your mood</option>
                        <option value="tired">😴 Tired</option>
                        <option value="meh">😐 Meh</option>
                        <option value="energized">⚡ Energized</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1">What's on your mind?</label>
                    <textarea
                        className="w-full border rounded px-3 py-2"
                        rows="3"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Big meeting? No plans? Anything you want to share..."
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>

            {response && (
                <div className="mt-6 p-4 border rounded bg-gray-50">
                    <p className="font-semibold text-indigo-600">Compass says:</p>
                    <p className="mt-2 text-gray-800">{response}</p>
                </div>
            )}

            {/* ✅ RememberThis input for adding new memories */}
            <RememberThis
                onSave={(newMemory) => setMemories([newMemory, ...memories])}
            />
            <TodayTimeline memories={memories} />
        </div>
    );
};

export default Flow;