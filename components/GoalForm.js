"use client";


import { useEffect, useState } from "react";
import { createGoal, updateGoal } from "@/lib/api";


export default function GoalForm({ onGoalAdded, onGoalUpdate, editGoal, setEditGoal }) {
    const [formData, setFormData] = useState({
        name: "",
        targetAmount: "",
        category: "",
        deadline: "",
    });

    useEffect(() => {
        if (editGoal) {
            setFormData({
                name: editGoal.name,
                targetAmount: editGoal.targetAmount,
                category: editGoal.category,
                deadline: editGoal.deadline,
            });

            window.scrollTo({ top: 0, behavior: "smooth"});
        }
    }, [editGoal])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const goalData = {
            ...formData,
            targetAmount: Number(formData.targetAmount)
        };

        if (editGoal) {
            const updated = await updateGoal(editGoal.id, goalData);
            onGoalUpdate(updated);
            setEditGoal(null);
        } else {
            const newGoal = {
                ...goalData,
                savedAmount: 0,
                createdAt: new Date().toISOString("T")[0],
            };
            const savedGoal = await createGoal(newGoal);
            onGoalAdded(savedGoal);
        }


        setFormData({ 
            name: "", 
            targetAmount: "", 
            category: "",
            deadline: ""
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            <h2 className="text-xl font-semibold">{editGoal ? "Edit Goal" : "Add a New Goal"}</h2>

            <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Goal Name"
                required
                className="w-full p-2 border rounded"
            />

            <input 
                name="targetAmount"
                type="number"
                value={formData.targetAmount}
                onChange={handleChange}
                placeholder="Target Amount"
                required
                className="w-full p-2 border rounded"
            />

            <input 
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category (e.g, Travel)"
                required
                className="w-full p-2 border rounded"
            />

            <input 
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
            />

            <button 
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {editGoal ? "Update Goal" : "Create Goal"}
            </button>

            {editGoal && (
                <button
                    type="buuton"
                    onClick={() => {
                        setEditGoal(null);
                        setFormData({
                            name:"",
                            targetAmount: "",
                            category: "",
                            deadline:""
                        });
                    }}
                    className="ml-2 text-sm text-red-500 hover:text-red-700"
                >
                    Cancel
                </button>
            )}
        </form>
    );
} 