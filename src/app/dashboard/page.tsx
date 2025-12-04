"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// 🔑 Replace with your actual Render backend URL
const API_BASE = "https://final-test-r9wu.onrender.com";

interface Position {
  position_id?: number;
  position_code: string;
  position_name: string;
}

export default function DashboardPage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ position_code: "", position_name: "" });
  const [editID, setEditID] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPositions();
  }, []);

  async function fetchPositions() {
    try {
      const res = await fetch(`${API_BASE}/positions`);
      if (!res.ok) throw new Error("Failed to fetch positions");
      const data = await res.json();
      setPositions(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addPosition() {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/positions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to add new position");
      }

      setForm({ position_code: "", position_name: "" });
      fetchPositions();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function saveEditedPos() {
    if (!editID) return alert("No item selected");
    setError("");
    try {
      const res = await fetch(`${API_BASE}/positions/${editID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update");
      }

      setEditID(null);
      setForm({ position_code: "", position_name: "" });
      fetchPositions();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function deletePos(id: number) {
    if (!confirm("Are you sure?")) return;
    setError("");
    try {
      const res = await fetch(`${API_BASE}/positions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Delete failed");
      }
      fetchPositions();
    } catch (err: any) {
      setError(err.message);
    }
  }

  function handleEdit(item: Position) {
    setEditID(item.position_id!);
    setForm({
      position_code: item.position_code,
      position_name: item.position_name,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancel() {
    setEditID(null);
    setForm({ position_code: "", position_name: "" });
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-blue-600 dark:text-blue-400"
        >
          Positions Dashboard
        </motion.h1>
        <div className="flex gap-2">
          <Button onClick={fetchPositions}>Refresh</Button>
          <Button variant="destructive">Logout</Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 shadow">
          {error}
        </div>
      )}

      {/* Create/Edit Form */}
      <Card className="p-5 shadow mb-8">
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editID ? saveEditedPos() : addPosition();
            }}
          >
            <div className="flex gap-4 flex-wrap">
              <Input
                placeholder="Position Code"
                value={form.position_code}
                onChange={(e) =>
                  setForm({ ...form, position_code: e.target.value })
                }
              />
              <Input
                placeholder="Position Name"
                value={form.position_name}
                onChange={(e) =>
                  setForm({ ...form, position_name: e.target.value })
                }
              />
              <Button type="submit" className="bg-blue-600">
                {editID ? "Update" : "Create"}
              </Button>
              {editID && (
                <Button variant="destructive" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-bold text-xl mb-4">
          Positions List {loading && "(loading...)"}:
        </h3>

        <table className="w-full text-left shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Code</th>
              <th className="p-2">Name</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions.length === 0 && !loading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No positions found.
                </td>
              </tr>
            ) : (
              positions.map((pos) => (
                <tr key={pos.position_id}>
                  <td className="p-2">{pos.position_id}</td>
                  <td className="p-2">{pos.position_code}</td>
                  <td className="p-2">{pos.position_name}</td>
                  <td className="p-2 text-right">
                    <Button className="mr-2" onClick={() => handleEdit(pos)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => deletePos(pos.position_id!)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
