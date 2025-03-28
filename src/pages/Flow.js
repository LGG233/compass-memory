import React, { useState } from "react";
import MorningCheckIn from "../components/MorningCheckIn";
import MemoryCompanion from "../components/MemoryCompanion";
import RememberThis from "../components/RememberThis";
import { loadMemories, saveMemories } from "../utils/memoryStore";
import Section from "../components/Section";

const Flow = () => {
    const [memories, setMemories] = useState(() => loadMemories());
    const [lastCheckInDate, setLastCheckInDate] = useState(() => {
        return localStorage.getItem("lastCheckInDate") || null;
    });
    const [showReflectionInput, setShowReflectionInput] = useState(false);

    const today = new Date().toISOString().split("T")[0];
    const hasCheckedIn = lastCheckInDate === today;

    const handleSaveCheckIn = (entry) => {
        const updated = [...memories, entry];
        setMemories(updated);
        saveMemories(updated);

        localStorage.setItem("lastCheckInDate", today);
        setLastCheckInDate(today);
    };

    const handleSaveMemory = (entry) => {
        const updated = [...memories, entry];
        setMemories(updated);
        saveMemories(updated);
    };

    const activeMemories = memories.filter(
        (m) => !m.status || m.status === "active"
    );

    // Split by type
    const reminders = activeMemories.filter((m) => m.type === "reminder");
    const events = activeMemories.filter((m) => m.type === "event");
    const notes = activeMemories.filter((m) => m.type === "note");
    const reflections = activeMemories.filter(
        (m) => m.type === "reflection" && m.mood
    );
    const observations = activeMemories.filter(
        (m) => m.type === "reflection" && !m.mood
    );

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">🧭 My Day with Compass</h1>

            {!hasCheckedIn ? (
                <MorningCheckIn onSave={handleSaveCheckIn} />
            ) : (
                <div className="mb-6">
                    <p className="text-sm text-gray-600 italic mb-2">
                        You’ve already checked in today.
                    </p>
                    <button
                        onClick={() => setShowReflectionInput(true)}
                        className="text-sm text-indigo-600 underline hover:text-indigo-800"
                    >
                        + Add Additional Reflection
                    </button>
                    {reminders.length > 0 && (
                        <Section title="🔔 Reminders" items={reminders} />
                    )}

                    {events.length > 0 && (
                        <Section title="📆 Events" items={events} />
                    )}

                    {notes.length > 0 && (
                        <Section title="📝 Notes" items={notes} />
                    )}

                    {reflections.length > 0 && (
                        <Section title="🪞 Your Reflections" items={reflections} />
                    )}

                    {observations.length > 0 && (
                        <Section title="🧭 Compass Observations" items={observations} />
                    )}
                </div>
            )}

            {showReflectionInput && (
                <RememberThis onSave={handleSaveMemory} />
            )}

            <MemoryCompanion memories={memories} setMemories={setMemories} />
        </div>
    );
};

export default Flow;
