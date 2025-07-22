const API_URL = "http://localhost:3001/goals";

// GET: Fetch all goals
export async function getGoals() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch goals from json-server");
    return response.json();
}


// POST: Creates a new goal
export async function createGoal(goal) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(goal),
    });

    if(!response.ok) throw new Error("Failed to create goal");
    return await response.json();
}

// PATCH: Update part of a goal
export async function updateGoal(id, updatedFields) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields), 
    });

    if(!response.ok) throw new Error("Failed to update goal");
    return await response.json();
}


// DELETE: Remove a goal
export async function deleteGoal(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if(!response.ok) throw new Error("Failed to delete goal");
    return true;
}






