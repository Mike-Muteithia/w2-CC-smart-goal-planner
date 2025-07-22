"use client";

export default function GoalCard({ goal, onDelete, onEdit }) {
    const { id, name, targetAmount, savedAmount, deadline, category } = goal;

    const remainder = targetAmount - savedAmount;
    const progress = Math.min((savedAmount / targetAmount) * 100, 100).toFixed(2);


    return (
        <div className="border p-4 rounded shadow-sm bg-black">
            <h2 className="text-xl font-semibold mb-1">{name}</h2>
            <p className="text-sm text-gray-600 mb-1">Category: {category}</p>
            <p className="text-sm text-gray-600 mb-1">Deadline: {deadline}</p>
            <p className="text-sm mb-1">
                Saved: <strong>${savedAmount}</strong> / ${targetAmount}
            </p>
            <p className="text-sm mb-3 text-red-600">
                Remaining: ${remainder}
            </p>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="text-xs text-gray-600 mb-2">
                Progress: {progress}%
            </p>

            <div className="flex gap-4">
                <button 
                onClick={() => onDelete(id)}
                className="text-red-500 hover:text-red-700 text-sm"
                >
                    Delete
                </button>

                <button 
                    onClick={() => onEdit(goal)}
                    className="text-blue-500 hover: text-blue-700 text-sm mr-4"
                >
                    Edit
                </button>
            </div>
        </div>
    )

}