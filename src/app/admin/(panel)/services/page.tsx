"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminCard, TextInput, Field, SaveButton, StatusMessage } from "@/components/admin/ui";

type ServiceRow = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  published: boolean;
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    setServices(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    load();
  }, []);

  async function addService(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        summary: "",
        overview: "",
        image: "/images/Personal-Training.png",
        heroImage: "/images/Personal-Training.png",
        detailImage: "/images/Personal-Training.png",
      }),
    });
    if (!res.ok) {
      setMsg("Could not create service");
      return;
    }
    const created = await res.json();
    setTitle("");
    setMsg("Service created");
    await load();
    window.location.href = `/admin/services/${created._id}`;
  }

  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-white uppercase">Services</h1>
        <p className="mt-1 text-sm text-white/50">
          Add, edit, or delete services. Detail pages use `/services/[slug]`.
        </p>
      </div>

      <AdminCard title="Add service">
        <form onSubmit={addService} className="flex flex-wrap items-end gap-3">
          <Field label="Title">
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="New service name"
            />
          </Field>
          <SaveButton>Add service</SaveButton>
        </form>
        {msg && (
          <div className="mt-3">
            <StatusMessage type={msg.includes("created") ? "ok" : "error"}>
              {msg}
            </StatusMessage>
          </div>
        )}
      </AdminCard>

      <AdminCard title="All services">
        <div className="divide-y divide-white/10">
          {services.map((s) => (
            <div
              key={s._id}
              className="flex flex-wrap items-center justify-between gap-3 py-4"
            >
              <div>
                <p className="font-semibold text-white">{s.title}</p>
                <p className="text-xs text-white/40">/services/{s.slug}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/services/${s._id}`}
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-xs uppercase"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => remove(s._id)}
                  className="rounded-lg border border-crimson/40 px-3 py-1.5 text-xs text-crimson uppercase"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
