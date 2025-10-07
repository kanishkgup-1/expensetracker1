import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// 🏠 Expense Tracker Page
function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");

  const addExpense = (e) => {
    e.preventDefault();
    if (!item || !price || !date || !category) return;
    const newExpense = {
      id: Date.now(),
      item,
      price: parseFloat(price),
      date,
      category,
    };
    setExpenses([newExpense, ...expenses]);
    setItem("");
    setPrice("");
    setDate("");
    setCategory("Food");
  };
  // ✅ Calculate total spent
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.price, 0);

  // ✅ Find top category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.price;
    return acc;
  }, {});
  const topCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) =>
        categoryTotals[a] > categoryTotals[b] ? a : b
      )
      : "None";

  return (
    <main className="flex-1 container mx-auto p-6">
      {/* Add Expense Form */}
      {/* ✅ Summary Card */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-md flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium">Total Spent</h2>
          <p className="text-2xl font-bold">₹{totalSpent.toFixed(2)}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Top Category</h2>
          <p className="text-xl font-semibold">{topCategory}</p>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
      <form
        onSubmit={addExpense}
        className="bg-white p-6 rounded-2xl shadow-md mb-6 flex gap-4 flex-wrap"
      >
        

        <input
          type="text"
          placeholder="Item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="border p-2 rounded-md flex-1"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded-md w-32"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded-md"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option>Food & Drinks</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Travel</option>
          <option>Health & Fitness</option>
          <option>Other</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {/* Expenses List */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Expenses</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses added yet.</p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {expenses.map((exp) => (
              <li
                key={exp.id}
                className="flex justify-between bg-gray-50 p-3 rounded-md shadow-sm"
              >
                <div>
                  <span className="font-semibold">{exp.item}</span>{" "}
                  <span className="text-gray-500 text-sm">
                    ({exp.category}, {exp.date})
                  </span>
                </div>
                <span className="font-semibold">₹{exp.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

// ⭐ Recommendations Page (empty for now)
function Recommendations() {
  return (
    <main className="flex-1 container mx-auto p-6">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <p className="text-gray-500">
          Your personalized recommendations will appear here.
        </p>
      </div>
    </main>
  );
}

// 🌐 Main App with Router
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4 shadow-md flex gap-6">
          <Link to="/" className="text-2xl font-bold">
            SpendSmart
          </Link>
          <div className="flex gap-4 mt-1">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/recommendations" className="hover:underline">
              Recommendations
            </Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<ExpenseTracker />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-blue-600 text-white text-center p-4 mt-auto">
          <p>© 2025 SpendSmart</p>
        </footer>
      </div>
    </Router>
  );
}
