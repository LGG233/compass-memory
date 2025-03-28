// src/utils/userProfile.js

export const defaultUserProfile = {
    preferences: {
        likes: [
            "vanilla malts", "foreign films", "early mornings", "long bike rides",
            "quiet cafes", "indoor plants", "weekend brunch", "bookstores",
            "jazz", "hiking", "planning ahead"
        ],
        dislikes: [
            "chocolate shakes", "late meetings", "cold weather", "loud bars",
            "group texts", "rushed mornings", "last-minute changes"
        ],
        inferredPatterns: [
            "stays in on Friday nights",
            "uses Sunday to plan the week",
            "avoids texting after 9pm",
            "works best between 9am and 1pm"
        ]
    },

    relationships: {
        Juliette: {
            relation: "daughter",
            topics: ["school", "movies", "weekend plans"],
            communicationPreferences: {
                prefersText: true,
                bestTimeToCall: "after 4pm"
            }
        },
        Maria: {
            relation: "friend",
            sharedActivities: ["movies"],
            notes: "Works Mon/Wed/Thu; foreign film fan, especially Danish comedies",
            typicalDay: {
                tuesdayEvenings: "movie night"
            }
        },
        John: {
            relation: "friend",
            sharedActivities: ["lunch catch-ups"],
            notes: "Getting ready to move; prefers Tommy’s on Fridays at noon"
        },
        Jayne: {
            relation: "colleague",
            notes: "Works weekends, usually unavailable Sat/Sun 8–5"
        }
    },

    routines: {
        weekly: [
            { day: "Friday", behavior: "prefers staying in" },
            { day: "Tuesday", activity: "movie night with Maria" },
            { day: "Sunday", behavior: "plans the upcoming week" }
        ],
        sleepPattern: "goes to bed late, tired in mornings",
        morningCheckInTime: "before 9am"
    },

    shorthand: {
        "drinks with John": "Tommy’s at noon on Fridays",
        "movie with Maria": "Tuesday night, foreign film if possible",
        "bike route A": "East toward the lake, about 20 miles",
        "Juliette's class": "Tues/Thurs 10–12"
    },

    goals: {
        shortTerm: [
            "prep for Monday meeting", "text John about moving",
            "see a movie with Juliette"
        ],
        longTerm: [
            "be more social on weekends", "ride 500 miles this summer",
            "create a morning routine", "learn to cook three new vegetarian meals"
        ]
    },

    memoryTags: {
        Juliette: ["daughter", "weekend", "school", "movies"],
        Maria: ["Tuesdays", "foreign films", "Danish comedy"],
        John: ["Tommy’s", "moving", "Friday lunch"],
        self: ["haircuts", "exercise", "coffee habits"]
    }
};

// For now: return this hardcoded version
export const loadUserProfile = () => {
    return defaultUserProfile;
};