import React from "react";

const TodayTimeline = ({ memories }) => {
    const today = new Date().toDateString();

    const todaysMemories = memories.filter((m) => {
        const memoryDate = new Date(m.createdAt).toDateString();
        return memoryDate === today && m.status === "active";
    });

    if (todaysMemories.length === 0) return null;

    return (
        <div className="bg-white p-4 rounded shadow mt-8">
            <h2 className="text-xl font-semibold mb-3">📆 Today’s Reminders</h2>
            <ul className="space-y-2">
                {todaysMemories.map((m, idx) => (
                    <li
                        key={idx}
                        className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded text-gray-800"
                    >
                        <span className="block text-sm text-gray-500 mb-1 uppercase tracking-wide">
                            {m.type}
                        </span>
                        <span className="font-medium">{m.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodayTimeline;