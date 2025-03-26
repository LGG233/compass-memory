const STORAGE_KEY = "compass_memories";

// ✅ Export this function
export const loadMemories = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (err) {
        console.error("Failed to load memories:", err);
        return [];
    }
};

// ✅ Export this one too
export const saveMemories = (memories) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    } catch (err) {
        console.error("Failed to save memories:", err);
    }
};