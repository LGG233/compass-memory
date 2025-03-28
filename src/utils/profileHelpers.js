// src/utils/profileHelpers.js

export const buildProfileSummary = (userProfile) => {
    const likes = userProfile.preferences?.likes?.join(", ") || "None";
    const dislikes = userProfile.preferences?.dislikes?.join(", ") || "None";
    const patterns = userProfile.preferences?.inferredPatterns?.join(", ") || "None";

    const relationships = Object.entries(userProfile.relationships || {})
        .map(([name, info]) => {
            const notes = info.notes || "No notes";
            return `- ${name} (${info.relation}): ${notes}`;
        })
        .join("\n") || "None";

    const routines = userProfile.routines?.weekly?.map((r) =>
        `- ${r.day}: ${r.activity || r.behavior}`
    ).join("\n") || "None";

    const shorthand = Object.entries(userProfile.shorthand || {})
        .map(([key, val]) => `- "${key}" = "${val}"`)
        .join("\n") || "None";

    return `
  User Preferences:
  - Likes: ${likes}
  - Dislikes: ${dislikes}
  - Patterns: ${patterns}
  
  Relationships:
  ${relationships}
  
  Weekly Routines:
  ${routines}
  
  Shorthand Phrases:
  ${shorthand}
  `;
};