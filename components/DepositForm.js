"use client";

import { useState } from "react";
import { updateGoal } from "@/lib/api";

export default function DepositForm({ goals, onGoalUpdated }) {
    const [selectedId, setSelectedId] = useState(goals[0]?.id || "");
    const [amount, setAmount] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deposit = Number(amount);
        if (!deposit || deposit <= 0) return;

        const goalToUpdate = goals.find(goal => goal.id === selectedId);
        const newSavedAmount = goalToUpdate.savedAmount + deposit;

        const updatedGoal = await updateGoal(selectedId, {
            savedAmount: newSavedAmount,
        });

        onGoalUpdated(updatedGoal);
        setAmount("");
    };


    return (
        <form onSubmit={handleSubmit} className="bg-gray-900 p-4 rounded mb-6">
            <h2 className="text-lg font-semibold mb-3">Deposit to a Goal</h2>

            <select
                className="border bg-gray-900 p-2 rounded w-full mb-3"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
            >
                {goals.map(goal => (
                    <option key={goal.id} value={goal.id}>
                        {goal.name}
                    </option>
                ))}
            </select>

            <input 
                type="number"
                className="border p-2 rounded w-full mb-3"
                placeholder="Amount to deposit"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min={1}
            />

            <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
                Deposit
            </button>
        </form>
    )
}


