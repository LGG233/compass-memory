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

    const handleEditDelete = (memoryToDelete) => {
        const updated = memories.filter(
            (m) => m.createdAt !== memoryToDelete.createdAt
        );
        setMemories(updated);
        setEditingMemory(null);
    };

    const handleDismiss = (index) => {
        const updated = memories.map((m, i) =>
            i === index ? { ...m, status: "archived" } : m
        );
        setMemories(updated);
    };

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

    const handleRestore = (index) => {
        const updated = memories.map((m, i) =>
            i === index ? { ...m, status: "active" } : m
        );
        setMemories(updated);
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
                {activeMemories.map((item, idx) => (
                    <li
                        key={idx}
                        className="bg-gray-100 p-3 rounded text-gray-800 border-l-4 border-indigo-400 flex justify-between items-center">
                        <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                            {getIconForType(item.type)} {item.type}</span>
                        <span className="font-medium">{item.text}</span>
                        <span className="text-xs text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString()} · Mode: {item.mode || "active"}
                        </span>
                        <button
                            onClick={() => setEditingMemory(item)}
                            className="text-sm text-gray-500 hover:underline ml-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDismiss(idx)}
                            className="text-sm text-red-500 hover:underline ml-4"
                        >
                            Dismiss
                        </button>
                    </li>
                ))}
            </ul>

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