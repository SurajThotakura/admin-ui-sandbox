"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Search, Plus, Download, Upload, Filter, ChevronDown,
  MoreHorizontal, Eye, EyeOff, Pencil, Trash2, Copy,
  ArrowUpDown, X, Check,
} from "lucide-react";
import { products as allProducts, categories, departments, statuses } from "../data/productsCatalog";

function Toggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <div
        className="w-9 h-5 relative shrink-0 transition-colors duration-200"
        style={{ background: checked ? "var(--color-primary)" : "var(--color-sand-300)" }}
        onClick={onChange}
      >
        <div
          className="absolute top-0.5 left-0.5 w-4 h-4 bg-white transition-transform duration-200"
          style={{
            transform: checked ? "translateX(16px)" : "translateX(0)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </div>
      {label && (
        <span className="text-[13px] font-medium select-none whitespace-nowrap" style={{ color: "var(--color-gray-600)" }}>
          {label}
        </span>
      )}
    </label>
  );
}

function Checkbox({ checked, onChange, indeterminate }) {
  return (
    <div
      className="w-[18px] h-[18px] flex items-center justify-center cursor-pointer shrink-0 transition-all duration-150 border-2"
      style={{
        background: checked ? "var(--color-primary)" : "white",
        borderColor: checked ? "var(--color-primary)" : indeterminate ? "var(--color-primary)" : "var(--color-sand-300)",
        color: "white",
      }}
      onClick={onChange}
    >
      {checked && <Check size={12} strokeWidth={3} />}
      {indeterminate && !checked && (
        <div className="w-2 h-0.5" style={{ background: "var(--color-primary)" }} />
      )}
    </div>
  );
}

function Dropdown({ value, options, onChange, placeholder, variant }) {
  const [open, setOpen] = useState(false);
  const isForm = variant === "form";
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 border cursor-pointer transition-all duration-150 whitespace-nowrap justify-between ${
          isForm ? "bg-white h-10 w-full" : "min-w-[140px]"
        }`}
        style={{
          padding: isForm ? "7px 12px" : "7px 12px",
          background: isForm ? "white" : "var(--color-sand-50)",
          borderColor: "var(--color-sand-200)",
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--color-gray-600)",
        }}
      >
        <span style={{ color: !value ? "var(--color-gray-300)" : undefined }}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--color-gray-300)" }}
        />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-[200]" onClick={() => setOpen(false)} />
          <div
            className="absolute top-[calc(100%+4px)] left-0 min-w-full z-[201] p-1 animate-dropdown-in"
            style={{
              background: "white",
              border: "1px solid var(--color-sand-200)",
            }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                className="flex items-center gap-2 w-full px-2.5 py-2 border-none text-left text-[13px] cursor-pointer whitespace-nowrap transition-colors duration-100"
                style={{
                  background: opt === value ? "var(--color-primary-light)" : "none",
                  color: opt === value ? "var(--color-primary)" : "var(--color-gray-600)",
                  fontFamily: "var(--font-body)",
                  fontWeight: opt === value ? 600 : 400,
                }}
                onClick={() => { onChange(opt); setOpen(false); }}
              >
                {opt}
                {opt === value && <Check size={14} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    active: { background: "var(--color-status-good-bg)", color: "var(--color-status-good)" },
    draft: { background: "var(--color-sand-100)", color: "var(--color-gray-400)" },
    discontinued: { background: "var(--color-status-critical-bg)", color: "var(--color-status-critical)" },
  };
  return (
    <span
      className="inline-block text-[11px] font-semibold px-2.5 py-[3px] capitalize"
      style={styles[status]}
    >
      {status}
    </span>
  );
}

const emptyForm = {
  name: "", description: "", category: "", department: "",
  price: "", stock: "", status: "active", visibility: "published",
};

function AddProductModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (open) setForm(emptyForm); }, [open]);

  if (!open || !mounted) return null;

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const set = (field) => (val) => setForm({ ...form, [field]: val });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.category || !form.department || !form.price || !form.stock) return;
    onAdd({
      ...form,
      id: `SKU-${String(Math.floor(Math.random() * 90000) + 10000)}`,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      currency: "USD",
      featured: false,
      newArrival: true,
      image: "\uD83D\uDCE6",
    });
    onClose();
  };

  const categoryOptions = categories.filter((c) => c !== "All Categories");
  const departmentOptions = departments.filter((d) => d !== "All Departments");

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center animate-fade-in"
      style={{ background: "rgba(26, 23, 20, 0.45)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[520px] max-h-[calc(100vh-80px)] overflow-y-auto animate-slide-up"
        style={{ boxShadow: "0 0 0 1px var(--color-sand-200)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: "var(--color-sand-100)" }}
        >
          <h2
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-800)" }}
          >
            Add Product
          </h2>
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 border-none bg-transparent cursor-pointer transition-all duration-150"
            style={{ color: "var(--color-gray-400)" }}
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>
                Product Name
              </label>
              <input
                type="text"
                placeholder="e.g. Enterprise License"
                value={form.name}
                onChange={update("name")}
                required
                className="h-10 px-4 border text-[13px] outline-none transition-all duration-150 focus:border-primary focus:outline-2 focus:outline-primary focus:-outline-offset-1"
                style={{
                  borderColor: "var(--color-sand-200)",
                  fontFamily: "var(--font-body)",
                  color: "var(--color-gray-700)",
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>
                Description
              </label>
              <textarea
                placeholder="Brief product description..."
                value={form.description}
                onChange={update("description")}
                required
                className="min-h-[80px] px-4 py-2 border text-[13px] outline-none resize-y transition-all duration-150 focus:border-primary focus:outline-2 focus:outline-primary focus:-outline-offset-1"
                style={{
                  borderColor: "var(--color-sand-200)",
                  fontFamily: "var(--font-body)",
                  color: "var(--color-gray-700)",
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>Category</label>
                <Dropdown value={form.category} options={categoryOptions} onChange={set("category")} placeholder="Select category" variant="form" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>Department</label>
                <Dropdown value={form.department} options={departmentOptions} onChange={set("department")} placeholder="Select department" variant="form" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>Price (USD)</label>
                <input type="number" min="0" step="1" placeholder="0" value={form.price} onChange={update("price")} required
                  className="h-10 px-4 border text-[13px] outline-none transition-all duration-150 focus:border-primary focus:outline-2 focus:outline-primary focus:-outline-offset-1"
                  style={{ borderColor: "var(--color-sand-200)", fontFamily: "var(--font-body)", color: "var(--color-gray-700)" }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>Stock</label>
                <input type="number" min="0" step="1" placeholder="0" value={form.stock} onChange={update("stock")} required
                  className="h-10 px-4 border text-[13px] outline-none transition-all duration-150 focus:border-primary focus:outline-2 focus:outline-primary focus:-outline-offset-1"
                  style={{ borderColor: "var(--color-sand-200)", fontFamily: "var(--font-body)", color: "var(--color-gray-700)" }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>Status</label>
                <Dropdown value={form.status} options={["active", "draft"]} onChange={set("status")} placeholder="Select status" variant="form" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>Visibility</label>
                <Dropdown value={form.visibility} options={["published", "hidden"]} onChange={set("visibility")} placeholder="Select visibility" variant="form" />
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-end gap-2 px-6 py-4 border-t"
            style={{ borderColor: "var(--color-sand-100)" }}
          >
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 h-10 px-4 text-[13px] font-semibold cursor-pointer transition-all duration-150 border"
              style={{
                background: "white",
                color: "var(--color-gray-600)",
                borderColor: "var(--color-sand-200)",
                fontFamily: "var(--font-body)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 h-10 px-4 text-[13px] font-semibold cursor-pointer transition-all duration-150 border-none text-white"
              style={{ background: "var(--color-primary)", fontFamily: "var(--font-body)" }}
            >
              <Plus size={16} />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

function ProductRow({ product, selected, onSelect, onToggleVisibility }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <tr
      className="transition-colors duration-100"
      style={{
        background: selected ? "var(--color-primary-light)" : undefined,
      }}
    >
      <td className="text-center w-[44px] px-3 py-3 border-b" style={{ borderColor: "var(--color-sand-100)" }}>
        <Checkbox checked={selected} onChange={onSelect} />
      </td>
      <td className="px-3 py-3 border-b" style={{ borderColor: "var(--color-sand-100)" }}>
        <div className="flex items-center gap-4">
          <div
            className="w-[38px] h-[38px] flex items-center justify-center text-lg shrink-0"
            style={{ background: "var(--color-sand-100)" }}
          >
            {product.image}
          </div>
          <div>
            <div
              className="text-sm font-bold flex items-center gap-1.5"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-800)" }}
            >
              {product.name}
              {product.newArrival && (
                <span
                  className="inline-block text-[9px] font-bold tracking-[1px] uppercase px-1.5 py-px"
                  style={{
                    background: "var(--color-accent)",
                    color: "var(--color-gray-800)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  NEW
                </span>
              )}
            </div>
            <div className="text-xs mt-px" style={{ color: "var(--color-gray-300)" }}>
              {product.description}
            </div>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 border-b text-xs tabular-nums" style={{ borderColor: "var(--color-sand-100)", color: "var(--color-gray-400)" }}>
        {product.id}
      </td>
      <td className="px-3 py-3 border-b text-[13px] max-w-[160px]" style={{ borderColor: "var(--color-sand-100)", color: "var(--color-gray-500)" }}>
        {product.category}
      </td>
      <td className="px-3 py-3 border-b text-[13px] font-semibold tabular-nums" style={{ borderColor: "var(--color-sand-100)", color: "var(--color-gray-700)" }}>
        {product.price.toLocaleString()}{" "}
        <span className="font-normal text-[11px]" style={{ color: "var(--color-gray-300)" }}>{product.currency}</span>
      </td>
      <td className="px-3 py-3 border-b" style={{ borderColor: "var(--color-sand-100)" }}>
        <div className="flex items-center gap-1.5 tabular-nums text-[13px]">
          <div
            className="w-[7px] h-[7px] shrink-0"
            style={{
              background:
                product.stock === 0
                  ? "var(--color-status-critical)"
                  : product.stock < 200
                  ? "var(--color-status-warning)"
                  : "var(--color-status-good)",
            }}
          />
          {product.stock.toLocaleString()}
        </div>
      </td>
      <td className="px-3 py-3 border-b" style={{ borderColor: "var(--color-sand-100)" }}>
        <StatusBadge status={product.status} />
      </td>
      <td className="px-3 py-3 border-b" style={{ borderColor: "var(--color-sand-100)" }}>
        <Toggle checked={product.visibility === "published"} onChange={() => onToggleVisibility(product.id)} />
      </td>
      <td className="px-3 py-3 border-b" style={{ borderColor: "var(--color-sand-100)" }}>
        <div className="flex items-center gap-0.5">
          <button
            className="flex items-center justify-center w-[30px] h-[30px] border-none bg-transparent cursor-pointer transition-all duration-150"
            style={{ color: "var(--color-gray-400)" }}
            title="Edit"
          >
            <Pencil size={14} />
          </button>
          <div className="relative">
            <button
              className="flex items-center justify-center w-[30px] h-[30px] border-none bg-transparent cursor-pointer transition-all duration-150"
              style={{ color: "var(--color-gray-400)" }}
              onClick={() => setMenuOpen(!menuOpen)}
              title="More"
            >
              <MoreHorizontal size={14} />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-[200]" onClick={() => setMenuOpen(false)} />
                <div
                  className="absolute top-[calc(100%+4px)] right-0 min-w-[160px] z-[201] p-1 animate-dropdown-in"
                  style={{
                    background: "white",
                    border: "1px solid var(--color-sand-200)",
                  }}
                >
                  <button className="flex items-center gap-2 w-full px-2.5 py-2 border-none bg-transparent text-left text-[13px] cursor-pointer whitespace-nowrap transition-colors duration-100"
                    style={{ color: "var(--color-gray-600)", fontFamily: "var(--font-body)" }}>
                    <Eye size={14} style={{ opacity: 0.6 }} /> View on site
                  </button>
                  <button className="flex items-center gap-2 w-full px-2.5 py-2 border-none bg-transparent text-left text-[13px] cursor-pointer whitespace-nowrap transition-colors duration-100"
                    style={{ color: "var(--color-gray-600)", fontFamily: "var(--font-body)" }}>
                    <Copy size={14} style={{ opacity: 0.6 }} /> Duplicate
                  </button>
                  <div className="h-px my-1" style={{ background: "var(--color-sand-100)" }} />
                  <button className="flex items-center gap-2 w-full px-2.5 py-2 border-none bg-transparent text-left text-[13px] cursor-pointer whitespace-nowrap transition-colors duration-100"
                    style={{ color: "var(--color-status-critical)", fontFamily: "var(--font-body)" }}>
                    <Trash2 size={14} style={{ opacity: 0.6 }} /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [department, setDepartment] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [products, setProducts] = useState(allProducts);
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== "All Categories" && p.category !== category) return false;
    if (department !== "All Departments" && p.department !== department) return false;
    if (statusFilter !== "All" && p.status !== statusFilter) return false;
    if (onlyFeatured && !p.featured) return false;
    if (onlyInStock && p.stock === 0) return false;
    return true;
  });

  const allSelected = filtered.length > 0 && filtered.every((p) => selected.has(p.id));
  const someSelected = filtered.some((p) => selected.has(p.id));

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map((p) => p.id)));
  };

  const toggleVisibility = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, visibility: p.visibility === "published" ? "hidden" : "published" } : p
      )
    );
  };

  const addProduct = (product) => setProducts((prev) => [product, ...prev]);

  const activeFilterCount = [
    category !== "All Categories",
    department !== "All Departments",
    statusFilter !== "All",
    onlyFeatured,
    onlyInStock,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setCategory("All Categories");
    setDepartment("All Departments");
    setStatusFilter("All");
    setOnlyFeatured(false);
    setOnlyInStock(false);
  };

  return (
    <div className="flex flex-col gap-4 p-12 animate-slide-up" style={{ animationFillMode: "forwards" }}>
      <AddProductModal open={showAddModal} onClose={() => setShowAddModal(false)} onAdd={addProduct} />

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div
            className="flex items-center gap-2 h-10 flex-1 max-w-[380px] px-4 border transition-all duration-150 focus-within:border-primary focus-within:outline-2 focus-within:outline-primary focus-within:-outline-offset-1"
            style={{ background: "white", borderColor: "var(--color-sand-200)" }}
          >
            <Search size={16} className="shrink-0" style={{ color: "var(--color-gray-300)" }} />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none outline-none bg-transparent text-[13px] w-full h-full"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-700)" }}
            />
            {search && (
              <button
                className="flex items-center justify-center w-5 h-5 border-none shrink-0 cursor-pointer transition-colors duration-150"
                style={{ background: "var(--color-sand-200)", color: "var(--color-gray-500)" }}
                onClick={() => setSearch("")}
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            className="inline-flex items-center gap-1.5 h-10 px-4 text-[13px] font-semibold cursor-pointer transition-all duration-150 border"
            style={{
              background: showFilters ? "var(--color-primary-light)" : "white",
              color: showFilters ? "var(--color-primary)" : "var(--color-gray-600)",
              borderColor: showFilters ? "var(--color-primary)" : "var(--color-sand-200)",
              fontFamily: "var(--font-body)",
            }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span
                className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-[5px] text-[10px] font-bold text-white"
                style={{ background: "var(--color-primary)" }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1.5 h-10 px-4 text-[13px] font-semibold cursor-pointer transition-all duration-150 border-none bg-transparent"
            style={{ color: "var(--color-gray-500)", fontFamily: "var(--font-body)" }}
          >
            <Download size={15} /> Export
          </button>
          <button
            className="inline-flex items-center gap-1.5 h-10 px-4 text-[13px] font-semibold cursor-pointer transition-all duration-150 border-none bg-transparent"
            style={{ color: "var(--color-gray-500)", fontFamily: "var(--font-body)" }}
          >
            <Upload size={15} /> Import
          </button>
          <button
            className="inline-flex items-center gap-1.5 h-10 px-4 text-[13px] font-semibold cursor-pointer transition-all duration-150 border-none text-white"
            style={{ background: "var(--color-primary)", fontFamily: "var(--font-body)" }}
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} /> Add product
          </button>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div
          className="p-4 px-6 border relative z-[60] animate-slide-up"
          style={{
            background: "white",
            borderColor: "var(--color-sand-200)",
            animationFillMode: "forwards",
          }}
        >
          <div className="flex items-center gap-4 flex-wrap">
            <Dropdown value={category} options={categories} onChange={setCategory} placeholder="Category" />
            <Dropdown value={department} options={departments} onChange={setDepartment} placeholder="Department" />
            <Dropdown value={statusFilter} options={statuses} onChange={setStatusFilter} placeholder="Status" />
            <div className="w-px h-7" style={{ background: "var(--color-sand-200)" }} />
            <Toggle checked={onlyFeatured} onChange={() => setOnlyFeatured(!onlyFeatured)} label="Featured only" />
            <Toggle checked={onlyInStock} onChange={() => setOnlyInStock(!onlyInStock)} label="In stock" />
            {activeFilterCount > 0 && (
              <button
                className="inline-flex items-center gap-1 px-2 py-1 bg-transparent border-none text-[13px] cursor-pointer"
                style={{ color: "var(--color-gray-400)", fontFamily: "var(--font-body)" }}
                onClick={clearFilters}
              >
                <X size={14} /> Clear all
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div
          className="flex items-center gap-4 px-4 py-2 border animate-slide-up"
          style={{
            background: "var(--color-primary-light)",
            borderColor: "rgba(0, 88, 163, 0.15)",
            animationFillMode: "forwards",
          }}
        >
          <span
            className="text-[13px] font-bold whitespace-nowrap"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
          >
            {selected.size} selected
          </span>
          <div className="flex gap-2 flex-1">
            <button className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold cursor-pointer border"
              style={{ background: "white", color: "var(--color-gray-600)", borderColor: "var(--color-sand-200)", fontFamily: "var(--font-body)" }}>
              <Eye size={14} /> Publish
            </button>
            <button className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold cursor-pointer border"
              style={{ background: "white", color: "var(--color-gray-600)", borderColor: "var(--color-sand-200)", fontFamily: "var(--font-body)" }}>
              <EyeOff size={14} /> Hide
            </button>
            <button className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold cursor-pointer border"
              style={{ background: "white", color: "var(--color-status-critical)", borderColor: "var(--color-status-critical-bg)", fontFamily: "var(--font-body)" }}>
              <Trash2 size={14} /> Delete
            </button>
          </div>
          <button
            className="inline-flex items-center px-2 py-1 bg-transparent border-none text-xs cursor-pointer"
            style={{ color: "var(--color-gray-400)", fontFamily: "var(--font-body)" }}
            onClick={() => setSelected(new Set())}
          >
            Deselect all
          </button>
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between">
        <span className="text-[13px]" style={{ color: "var(--color-gray-400)" }}>
          Showing{" "}
          <strong style={{ color: "var(--color-gray-700)", fontFamily: "var(--font-display)" }}>
            {filtered.length}
          </strong>{" "}
          of {products.length} products
        </span>
        <button
          className="inline-flex items-center gap-1 px-2 py-1 bg-transparent border-none text-xs cursor-pointer"
          style={{ color: "var(--color-gray-400)", fontFamily: "var(--font-body)" }}
        >
          <ArrowUpDown size={13} /> Sort by name
        </button>
      </div>

      {/* Product table */}
      <div className="bg-white overflow-visible" style={{ boxShadow: "0 0 0 1px var(--color-sand-200)" }}>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-sand-200)" }}>
              <th className="text-center w-[44px] px-3 py-3 text-[10px] font-semibold uppercase tracking-[1.5px] whitespace-nowrap"
                style={{ background: "var(--color-sand-50)", color: "var(--color-gray-300)" }}>
                <Checkbox checked={allSelected} indeterminate={someSelected && !allSelected} onChange={toggleAll} />
              </th>
              {["Product", "SKU", "Category", "Price", "Stock", "Status", "Visible", ""].map((h) => (
                <th key={h} className="text-left px-3 py-3 text-[10px] font-semibold uppercase tracking-[1.5px] whitespace-nowrap"
                  style={{ background: "var(--color-sand-50)", color: "var(--color-gray-300)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <ProductRow
                key={p.id}
                product={p}
                selected={selected.has(p.id)}
                onSelect={() => toggleSelect(p.id)}
                onToggleVisibility={toggleVisibility}
              />
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-12 text-center">
            <div className="text-5xl mb-4 opacity-60">📋</div>
            <p className="text-base font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-700)" }}>
              No products match your filters
            </p>
            <p className="text-[13px] mb-6" style={{ color: "var(--color-gray-400)" }}>
              Try adjusting your search or filter criteria
            </p>
            <button
              className="inline-flex items-center gap-1.5 h-10 px-4 text-[13px] font-semibold cursor-pointer border"
              style={{ background: "white", color: "var(--color-gray-600)", borderColor: "var(--color-sand-200)", fontFamily: "var(--font-body)" }}
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
