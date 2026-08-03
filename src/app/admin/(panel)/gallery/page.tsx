"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AdminCard,
  Field,
  TextInput,
  ImageUploadField,
  SaveButton,
  StatusMessage,
} from "@/components/admin/ui";

type Category = { _id: string; name: string; slug: string };
type Item = {
  _id: string;
  categoryId: string;
  src: string;
  alt: string;
  caption: string;
};

export default function AdminGalleryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [newCat, setNewCat] = useState("");
  const [msg, setMsg] = useState("");

  async function loadCategories() {
    const res = await fetch("/api/admin/gallery/categories");
    const data = await res.json();
    setCategories(Array.isArray(data) ? data : []);
    if (!active && data?.[0]?._id) setActive(data[0]._id);
  }

  async function loadItems(categoryId: string) {
    const res = await fetch(`/api/admin/gallery/items?categoryId=${categoryId}`);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (active) loadItems(active);
  }, [active]);

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/gallery/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCat }),
    });
    if (res.ok) {
      setNewCat("");
      loadCategories();
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete category and its images?")) return;
    await fetch(`/api/admin/gallery/categories/${id}`, { method: "DELETE" });
    setActive(null);
    loadCategories();
  }

  async function addImage(url: string) {
    if (!active) return;
    await fetch("/api/admin/gallery/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryId: active,
        src: url,
        alt: "",
        caption: "",
      }),
    });
    setMsg("Image added");
    loadItems(active);
  }

  async function saveItem(item: Item) {
    await fetch(`/api/admin/gallery/items/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    setMsg("Image saved");
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete image?")) return;
    await fetch(`/api/admin/gallery/items/${id}`, { method: "DELETE" });
    if (active) loadItems(active);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-white uppercase">Gallery</h1>
        <p className="mt-1 text-sm text-white/50">
          Manage categories and images
        </p>
      </div>

      {msg && <StatusMessage type="ok">{msg}</StatusMessage>}

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <AdminCard
          title="Categories"
          actions={
            <form onSubmit={addCategory} className="flex gap-2">
              <TextInput
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                placeholder="New category"
                required
              />
              <button type="submit" className="text-xs text-crimson uppercase">
                Add
              </button>
            </form>
          }
        >
          <div className="space-y-2">
            {categories.map((c) => (
              <div
                key={c._id}
                className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                  active === c._id ? "bg-crimson/15 text-crimson" : "hover:bg-white/5"
                }`}
              >
                <button type="button" onClick={() => setActive(c._id)} className="text-left text-sm">
                  {c.name}
                </button>
                <button
                  type="button"
                  onClick={() => deleteCategory(c._id)}
                  className="text-xs text-white/40 hover:text-crimson"
                >
                  Del
                </button>
              </div>
            ))}
          </div>
        </AdminCard>

        <div className="space-y-4">
          <AdminCard title="Add image to category">
            <ImageUploadField label="Upload / set path" value="" onChange={addImage} />
          </AdminCard>

          <AdminCard title="Images">
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((item) => (
                <div key={item._id} className="space-y-3 rounded-xl border border-white/10 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt="" className="h-40 w-full rounded-lg object-cover" />
                  <Field label="Caption">
                    <TextInput
                      value={item.caption}
                      onChange={(e) =>
                        setItems((list) =>
                          list.map((x) =>
                            x._id === item._id ? { ...x, caption: e.target.value } : x,
                          ),
                        )
                      }
                    />
                  </Field>
                  <Field label="Alt">
                    <TextInput
                      value={item.alt}
                      onChange={(e) =>
                        setItems((list) =>
                          list.map((x) =>
                            x._id === item._id ? { ...x, alt: e.target.value } : x,
                          ),
                        )
                      }
                    />
                  </Field>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => saveItem(item)}
                      className="rounded-lg bg-crimson px-3 py-1.5 text-xs uppercase"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteItem(item._id)}
                      className="rounded-lg border border-crimson/40 px-3 py-1.5 text-xs text-crimson uppercase"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {!items.length && (
                <p className="text-sm text-white/50">No images in this category.</p>
              )}
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
