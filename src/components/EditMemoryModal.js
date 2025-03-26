import React, { useState, useEffect } from "react";

const EditMemoryModal = ({ memory, isOpen, onClose, onSave, onDelete }) => {
    const [text, setText] = useState("");
    const [type, setType] = useState("note");
    const [mode, setMode] = useState("active");

    useEffect(() => {
        if (memory) {
            setText(memory.text);
            setType(memory.type || "note");
            setMode(memory.mode || "active");
        }
    }, [memory]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md transform transition-all duration-200 scale-100 opacity-100">
                <h2 className="text-lg font-semibold mb-4">Edit Memory</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block font-medium">Text</label>
                        <input
                            className="w-full border rounded px-3 py-2"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Type</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="reminder">⏰ Reminder</option>
                            <option value="note">📝 Note</option>
                            <option value="event">📅 Event</option>
                            <option value="conversation">💬 Conversation</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Mode</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                        >
                            <option value="active">🔔 Active</option>
                            <option value="passive">💭 Passive</option>
                        </select>
                    </div>

                    <div className="flex justify-between pt-4">
                        <button
                            className="text-sm text-red-500 hover:underline"
                            onClick={() => {
                                const confirmed = window.confirm("Are you sure you want to delete this memory?");
                                if (confirmed) {
                                    onDelete(memory);
                                }
                            }}                        >
                            Delete
                        </button>
                        <div className="space-x-2">
                            <button
                                className="text-sm text-gray-600 hover:underline"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                                onClick={() =>
                                    onSave({
                                        ...memory,
                                        text,
                                        type,
                                        mode,
                                    })
                                }
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditMemoryModal;