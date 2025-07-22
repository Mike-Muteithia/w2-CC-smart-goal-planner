"use client";

export default function Overview({ goals}) {
    const totalGoals = goals.length;
    const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
    const completedGoals = goals.filter(
        goal => goal.savedAmount >= goal.targetAmount
    ).length;

    const today = new Date();

    const warningGoals = goals.filter(goal => {
        const deadline = new Date(goal.deadline);
        const daysLeft = (deadline - today) / (1000 * 60 * 60 * 24)
        return daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount;
    });

    const overdueGoals = goals.filter(goal => {
        const deadline = new Date(goal.deadline);
        return deadline < today && goal.savedAmount < goal.targetAmount;
    });


    return (
        <section className="bg-gray-900 p-4 rounded mb-6">
            <h2 className="text-lg font-bold mb-4">Overview</h2>

            <p>Total Goals: <strong>{totalGoals}</strong></p>
            <p>Total Saved: <strong>{totalSaved}</strong></p>
            <p>Completed Goals: <strong>{completedGoals}</strong></p>

            {warningGoals.length > 0 && (
                <div className="mt-3 text-yellow-700">
                    ⚠️ Goals near deadline:
                    <ul className="list-disc pl-6">
                        {warningGoals.map(goal => (
                            <li key={goal.id}>
                                {goal.name} (Deadline: {goal.deadline})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {overdueGoals.length > 0 && (
                <div className="mt-3 text-red-700">
                    ❗Overdue goals:
                    <ul className="list-disc pl-6">
                        {overdueGoals.map(goal => (
                            <li key={goal.id}>
                                {goal.name} (Deadline: {goal.deadline})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}