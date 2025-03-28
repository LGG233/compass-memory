import React, { useState } from "react";
import EditMemoryModal from "./EditMemoryModal"; // ✅ import the modal


const MemoryCompanion = ({ memories, setMemories, showArchived }) => {
    const handleEditSave = (updatedMemory) => {
        const updated = memories.map((m) =>
            m.createdAt === updatedMemory.createdAt ? updatedMemory : m
        );
        setMemories(updated);
        setEditingMemory(null);
    };

    const reflections = memories.filter((m) => m.type === "reflection");

    const formatDate = (timestamp) =>
        new Date(timestamp).toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
        });

    const handleEditDelete = (memoryToDelete) => {
        const updated = memories.filter(
            (m) => m.createdAt !== memoryToDelete.createdAt
        );
        setMemories(updated);
        setEditingMemory(null);
    };

    const handleDismiss = (index) => {
        const confirmed = window.confirm("Are you sure you want to dismiss this reminder?");
        if (!confirmed) return;

        setFadingIndex(index);
        setTimeout(() => {
            const updated = memories.map((m, i) =>
                i === index ? { ...m, status: "archived" } : m
            );
            setMemories(updated);
            setFadingIndex(null);
        }, 300);
    };

    const [fadingIndex, setFadingIndex] = useState(null);

    const [editingMemory, setEditingMemory] = useState(null);

    const getIconForType = (type) => {
        switch (type) {
            case "reminder":
                return "⏰";
            case "note":
                return "📝";
            case "event":
                return "📅";
            case "conversation":
                return "💬";
            default:
                return "🧠";
        }
    };

    const getColorClassForType = (type) => {
        switch (type) {
            case "reminder":
                return "border-indigo-400 bg-indigo-50";
            case "note":
                return "border-yellow-400 bg-yellow-50";
            case "event":
                return "border-green-400 bg-green-50";
            case "conversation":
                return "border-pink-400 bg-pink-50";
            default:
                return "border-gray-300 bg-white";
        }
    };

    const handleRestore = (index) => {
        const updated = memories.map((m, i) =>
            i === index ? { ...m, status: "active" } : m
        );
        setMemories(updated);
    };

    const handleEdit = (item, index) => {
        setEditingMemory({ memory: item, index });
    };

    const activeMemories = memories.filter(
        (m) => !m.status || m.status === "active"
    );
    const archivedMemories = memories.filter(
        (m) => m.status === "archived"
    );

    if (activeMemories.length === 0) return null;

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-3">
                Here’s what you might want to remember:
            </h2>

            <ul className="space-y-2">
                {activeMemories.some(m => m.type === "reflection") && (
                    <section className="mb-6">
                        <h3 className="text-lg font-bold text-purple-700 mb-2">🌅 Reflections</h3>
                        <ul className="space-y-2">
                            {activeMemories.filter(m => m.type === "reflection").map((item, idx) => (
                                <li
                                    key={idx}
                                    className={`p-4 rounded shadow border-l-4 ${getColorClassForType(item.type)} flex justify-between items-start transition-opacity duration-300 ${fadingIndex === idx ? "opacity-0" : "opacity-100"}`}
                                >
                                    <div className="space-y-1">
                                        <p className="text-gray-800 font-medium">{item.text}</p>
                                        <p className="text-sm text-gray-500">
                                            Created {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end space-y-1 ml-4">
                                        <button onClick={() => handleEdit(item, idx)} className="text-sm text-blue-500 hover:underline">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDismiss(idx)} className="text-sm text-red-500 hover:underline">
                                            Dismiss
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}            </ul>

            {showArchived && archivedMemories.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <h3 className="text-md font-semibold text-gray-600 mb-2">Archived</h3>
                    <ul className="space-y-2 text-sm text-gray-500">
                        {archivedMemories.map((item, idx) => (
                            <li
                                key={`archived-${idx}`}
                                className="bg-gray-50 p-2 rounded border-l-4 border-gray-300 flex justify-between items-center"
                            >
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                        {getIconForType(item.type)} {item.type}
                                    </span>
                                    <span className="font-medium">{item.text}</span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString()} · Mode: {item.mode || "active"}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleRestore(idx)}
                                    className="text-sm text-blue-600 hover:underline ml-4"
                                >
                                    Restore
                                </button>
                            </li>))}
                    </ul>
                </div>
            )
            }

            {reflections.length > 0 && (
                <div className="mt-10 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">🌿 Compass Reflections</h3>
                    <ul className="space-y-4">
                        {reflections.map((item, idx) => (
                            <li
                                key={`reflection-${idx}`}
                                className="bg-white border rounded-lg p-4 shadow-sm text-gray-800"
                            >
                                <p className="text-sm italic">"{item.text}"</p>
                                <p className="text-xs text-gray-500 mt-2">🕰️ {formatDate(item.createdAt)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <EditMemoryModal
                memory={editingMemory}
                isOpen={!!editingMemory}
                onClose={() => setEditingMemory(null)}
                onSave={handleEditSave}
                onDelete={handleEditDelete}
            />        </div >
    );
};

export default MemoryCompanion;