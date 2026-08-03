"use client";

import { useEffect, useState } from "react";
import {
  AdminCard,
  Field,
  TextArea,
  TextInput,
  StatusMessage,
} from "@/components/admin/ui";

type Item = {
  _id?: string;
  question: string;
  answer: string;
  published: boolean;
};

export default function AdminFaqsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/admin/faqs");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    load();
  }, []);

  async function add() {
    await fetch("/api/admin/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: "New question?",
        answer: "Answer here.",
        published: true,
      }),
    });
    load();
  }

  async function save(item: Item) {
    if (!item._id) return;
    const res = await fetch(`/api/admin/faqs/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    setMsg(res.ok ? "Saved" : "Save failed");
  }

  async function remove(id: string) {
    if (!confirm("Delete FAQ?")) return;
    await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-white uppercase">FAQs</h1>
          <p className="mt-1 text-sm text-white/50">Site-wide questions and answers</p>
        </div>
        <button
          type="button"
          onClick={add}
          className="rounded-lg bg-crimson px-4 py-2 text-sm font-bold uppercase"
        >
          Add FAQ
        </button>
      </div>
      {msg && (
        <StatusMessage type={msg === "Saved" ? "ok" : "error"}>{msg}</StatusMessage>
      )}
      <div className="space-y-4">
        {items.map((item, i) => (
          <AdminCard key={item._id || i} title={`FAQ ${i + 1}`}>
            <div className="space-y-4">
              <Field label="Question">
                <TextInput
                  value={item.question}
                  onChange={(e) =>
                    setItems((list) =>
                      list.map((x, idx) =>
                        idx === i ? { ...x, question: e.target.value } : x,
                      ),
                    )
                  }
                />
              </Field>
              <Field label="Answer">
                <TextArea
                  value={item.answer}
                  onChange={(e) =>
                    setItems((list) =>
                      list.map((x, idx) =>
                        idx === i ? { ...x, answer: e.target.value } : x,
                      ),
                    )
                  }
                />
              </Field>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => save(item)}
                className="rounded-lg bg-crimson px-5 py-2.5 text-sm font-bold tracking-wide text-white uppercase"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => item._id && remove(item._id)}
                className="rounded-lg border border-crimson/40 px-4 py-2 text-sm text-crimson uppercase"
              >
                Delete
              </button>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
