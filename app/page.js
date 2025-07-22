"use client";

import { useEffect, useState } from "react";
import { getGoals, deleteGoal, updateGoal } from "@/lib/api";
import GoalForm from "@/components/GoalForm";
import GoalCard from "@/components/GoalCard";
import DepositForm from "@/components/DepositForm";
import Overview from "@/components/Overview";

export default function HomePage() {
  const [goals, setGoals] = useState([]);
  const [editGoal, setEditGoal] = useState(null);

  useEffect(() => {
    getGoals()
    .then(setGoals)
    .catch((error) => console.error("Error loading goals:", error));
  }, []);

  const handleGoalAdded = (newGoal) => {
    setGoals((prev) => [...prev, newGoal]);
  };

  const handleDelete = async (id) => {
    await deleteGoal(id);
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  }

  const handleGoalUpdated = (updateGoal) => {
    setGoals(prev => 
      prev.map(goal => goal.id === updateGoal.id ? updateGoal : goal)
    );
  };


  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Smart Goal Planner</h1>
    
      <GoalForm 
        onGoalAdded={handleGoalAdded}
        onGoalUpdated={handleGoalUpdated}
        editGoal={editGoal}
        setEditGoal={setEditGoal}
      />
      
      <Overview goals={goals} onGoalUpdated={handleGoalUpdated} />

      <DepositForm goals={goals} onGoalUpdated={handleGoalUpdated} />

      {goals.length === 0 ? (
        <p>No goals yet. Start by adding one!</p>
      ) : (
        <ul className="space-y-4">
          {goals.map((goal) => (
            <li 
              key={goal.id}
              className="border p-4 rounded shadow-sm"
            >
              <GoalCard 
                goal={goal} 
                onDelete={handleDelete}
                onEdit={setEditGoal} 
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}