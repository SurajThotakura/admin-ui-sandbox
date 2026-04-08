"use client";

import { useState, useEffect } from "react";
import {
  Search, Plus, Download, Upload, Filter,
  MoreHorizontal, Eye, EyeOff, Pencil, Trash2, Copy,
  ArrowUpDown, X,
} from "lucide-react";
import { products as allProducts, categories, departments, statuses } from "../data/productsCatalog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table";
import { Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "./ui/dialog";
import { DropdownSelect, ActionMenu } from "./ui/dropdown-menu";

const emptyForm = {
  name: "", description: "", category: "", department: "",
  price: "", stock: "", status: "active", visibility: "published",
};

function AddProductModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { if (open) setForm(emptyForm); }, [open]);

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

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogHeader onClose={onClose}>
        <DialogTitle>Add Product</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <DialogBody>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>
              Product Name
            </label>
            <Input type="text" placeholder="e.g. Enterprise License" value={form.name} onChange={update("name")} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>
              Description
            </label>
            <Textarea placeholder="Brief product description..." value={form.description} onChange={update("description")} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>Category</label>
              <DropdownSelect value={form.category} options={categoryOptions} onChange={set("category")} placeholder="Select category" variant="form" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>Department</label>
              <DropdownSelect value={form.department} options={departmentOptions} onChange={set("department")} placeholder="Select department" variant="form" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>Price (USD)</label>
              <Input type="number" min="0" step="1" placeholder="0" value={form.price} onChange={update("price")} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>Stock</label>
              <Input type="number" min="0" step="1" placeholder="0" value={form.stock} onChange={update("stock")} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>Status</label>
              <DropdownSelect value={form.status} options={["active", "draft"]} onChange={set("status")} placeholder="Select status" variant="form" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-500)" }}>Visibility</label>
              <DropdownSelect value={form.visibility} options={["published", "hidden"]} onChange={set("visibility")} placeholder="Select visibility" variant="form" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit"><Plus size={16} /> Add Product</Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}

function ProductRow({ product, selected, onSelect, onToggleVisibility }) {
  return (
    <TableRow selected={selected}>
      <TableCell className="text-center w-[44px]">
        <Checkbox checked={selected} onChange={onSelect} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-4">
          <div className="w-[38px] h-[38px] flex items-center justify-center text-lg shrink-0" style={{ background: "var(--color-sand-100)" }}>
            {product.image}
          </div>
          <div>
            <div className="text-sm font-bold flex items-center gap-1.5" style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-800)" }}>
              {product.name}
              {product.newArrival && (
                <span className="inline-block text-[9px] font-bold tracking-[1px] uppercase px-1.5 py-px" style={{ background: "var(--color-accent)", color: "var(--color-gray-800)", fontFamily: "var(--font-body)" }}>
                  NEW
                </span>
              )}
            </div>
            <div className="text-xs mt-px" style={{ color: "var(--color-gray-300)" }}>{product.description}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-xs tabular-nums" style={{ color: "var(--color-gray-400)" }}>{product.id}</TableCell>
      <TableCell className="max-w-[160px]" style={{ color: "var(--color-gray-500)" }}>{product.category}</TableCell>
      <TableCell className="font-semibold tabular-nums" style={{ color: "var(--color-gray-700)" }}>
        {product.price.toLocaleString()} <span className="font-normal text-[11px]" style={{ color: "var(--color-gray-300)" }}>{product.currency}</span>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1.5 tabular-nums">
          <div className="w-[7px] h-[7px] shrink-0" style={{
            background: product.stock === 0 ? "var(--color-status-critical)" : product.stock < 200 ? "var(--color-status-warning)" : "var(--color-status-good)",
          }} />
          {product.stock.toLocaleString()}
        </div>
      </TableCell>
      <TableCell><Badge variant={product.status}>{product.status}</Badge></TableCell>
      <TableCell>
        <Switch checked={product.visibility === "published"} onCheckedChange={() => onToggleVisibility(product.id)} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" title="Edit" style={{ color: "var(--color-gray-400)" }}>
            <Pencil size={14} />
          </Button>
          <ActionMenu
            trigger={
              <Button variant="ghost" size="icon" title="More" style={{ color: "var(--color-gray-400)" }}>
                <MoreHorizontal size={14} />
              </Button>
            }
            items={[
              { icon: <Eye size={14} />, label: "View on site" },
              { icon: <Copy size={14} />, label: "Duplicate" },
              { separator: true },
              { icon: <Trash2 size={14} />, label: "Delete", danger: true },
            ]}
          />
        </div>
      </TableCell>
    </TableRow>
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
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            style={showFilters ? {
              background: "var(--color-primary-light)",
              color: "var(--color-primary)",
              borderColor: "var(--color-primary)",
            } : undefined}
          >
            <Filter size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-[5px] text-[10px] font-bold text-white" style={{ background: "var(--color-primary)" }}>
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost"><Download size={15} /> Export</Button>
          <Button variant="ghost"><Upload size={15} /> Import</Button>
          <Button onClick={() => setShowAddModal(true)}><Plus size={16} /> Add product</Button>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="p-4 px-6 border relative z-[60] animate-slide-up" style={{ background: "white", borderColor: "var(--color-sand-200)", animationFillMode: "forwards" }}>
          <div className="flex items-center gap-4 flex-wrap">
            <DropdownSelect value={category} options={categories} onChange={setCategory} placeholder="Category" />
            <DropdownSelect value={department} options={departments} onChange={setDepartment} placeholder="Department" />
            <DropdownSelect value={statusFilter} options={statuses} onChange={setStatusFilter} placeholder="Status" />
            <div className="w-px h-7" style={{ background: "var(--color-sand-200)" }} />
            <Switch checked={onlyFeatured} onCheckedChange={setOnlyFeatured} label="Featured only" />
            <Switch checked={onlyInStock} onCheckedChange={setOnlyInStock} label="In stock" />
            {activeFilterCount > 0 && (
              <Button variant="text" onClick={clearFilters}><X size={14} /> Clear all</Button>
            )}
          </div>
        </div>
      )}

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="flex items-center gap-4 px-4 py-2 border animate-slide-up" style={{ background: "var(--color-primary-light)", borderColor: "rgba(0, 88, 163, 0.15)", animationFillMode: "forwards" }}>
          <span className="text-[13px] font-bold whitespace-nowrap" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>
            {selected.size} selected
          </span>
          <div className="flex gap-2 flex-1">
            <Button variant="outline" size="sm"><Eye size={14} /> Publish</Button>
            <Button variant="outline" size="sm"><EyeOff size={14} /> Hide</Button>
            <Button variant="danger" size="sm"><Trash2 size={14} /> Delete</Button>
          </div>
          <Button variant="text" size="sm" onClick={() => setSelected(new Set())}>Deselect all</Button>
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between">
        <span className="text-[13px]" style={{ color: "var(--color-gray-400)" }}>
          Showing <strong style={{ color: "var(--color-gray-700)", fontFamily: "var(--font-display)" }}>{filtered.length}</strong> of {products.length} products
        </span>
        <Button variant="text" size="sm"><ArrowUpDown size={13} /> Sort by name</Button>
      </div>

      {/* Product table */}
      <div className="bg-white overflow-visible" style={{ boxShadow: "0 0 0 1px var(--color-sand-200)" }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-[44px]">
                <Checkbox checked={allSelected} indeterminate={someSelected && !allSelected} onChange={toggleAll} />
              </TableHead>
              {["Product", "SKU", "Category", "Price", "Stock", "Status", "Visible", ""].map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <ProductRow
                key={p.id}
                product={p}
                selected={selected.has(p.id)}
                onSelect={() => toggleSelect(p.id)}
                onToggleVisibility={toggleVisibility}
              />
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-12 text-center">
            <div className="text-5xl mb-4 opacity-60">📋</div>
            <p className="text-base font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-700)" }}>
              No products match your filters
            </p>
            <p className="text-[13px] mb-6" style={{ color: "var(--color-gray-400)" }}>
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" onClick={clearFilters}>Clear filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
