import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Search,
  Plus,
  Download,
  Upload,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Copy,
  ArrowUpDown,
  X,
  Check,
} from 'lucide-react';
import { products as allProducts, categories, departments, statuses } from '../data/productsCatalog';

function Toggle({ checked, onChange, label }) {
  return (
    <label className="pp-toggle">
      <div className={`pp-toggle-track${checked ? ' on' : ''}`} onClick={onChange}>
        <div className="pp-toggle-thumb" />
      </div>
      {label && <span className="pp-toggle-label">{label}</span>}
    </label>
  );
}

function Checkbox({ checked, onChange, indeterminate }) {
  return (
    <div
      className={`pp-checkbox${checked ? ' checked' : ''}${indeterminate ? ' indeterminate' : ''}`}
      onClick={onChange}
    >
      {checked && <Check size={12} strokeWidth={3} />}
      {indeterminate && !checked && <div className="pp-checkbox-dash" />}
    </div>
  );
}

function Dropdown({ value, options, onChange, placeholder, variant }) {
  const [open, setOpen] = useState(false);
  const isForm = variant === 'form';
  return (
    <div className="pp-dropdown">
      <button
        type="button"
        className={`pp-dropdown-trigger${isForm ? ' pp-dropdown-form' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span className={!value ? 'pp-dropdown-placeholder' : ''}>{value || placeholder}</span>
        <ChevronDown size={14} className={open ? 'rotated' : ''} />
      </button>
      {open && (
        <>
          <div className="pp-dropdown-backdrop" onClick={() => setOpen(false)} />
          <div className="pp-dropdown-menu">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`pp-dropdown-item${opt === value ? ' active' : ''}`}
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
  return <span className={`pp-status-badge ${status}`}>{status}</span>;
}

const emptyForm = {
  name: '',
  description: '',
  category: '',
  department: '',
  price: '',
  stock: '',
  status: 'active',
  visibility: 'published',
};

function AddProductModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (open) setForm(emptyForm);
  }, [open]);

  if (!open) return null;

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
      currency: 'USD',
      featured: false,
      newArrival: true,
      image: '📦',
    });
    onClose();
  };

  const statusOptions = ['active', 'draft'];
  const visibilityOptions = ['published', 'hidden'];
  const categoryOptions = categories.filter((c) => c !== 'All Categories');
  const departmentOptions = departments.filter((d) => d !== 'All Departments');

  return createPortal(
    <div className="pp-modal-backdrop" onClick={onClose}>
      <div className="pp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pp-modal-header">
          <h2 className="pp-modal-title">Add Product</h2>
          <button type="button" className="pp-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="pp-modal-body">
            <div className="pp-form-field">
              <label className="pp-form-label">Product Name</label>
              <input
                className="pp-form-input"
                type="text"
                placeholder="e.g. Enterprise License"
                value={form.name}
                onChange={update('name')}
                required
              />
            </div>
            <div className="pp-form-field">
              <label className="pp-form-label">Description</label>
              <textarea
                className="pp-form-textarea"
                placeholder="Brief product description..."
                value={form.description}
                onChange={update('description')}
                required
              />
            </div>
            <div className="pp-form-row">
              <div className="pp-form-field">
                <label className="pp-form-label">Category</label>
                <Dropdown
                  value={form.category}
                  options={categoryOptions}
                  onChange={set('category')}
                  placeholder="Select category"
                  variant="form"
                />
              </div>
              <div className="pp-form-field">
                <label className="pp-form-label">Department</label>
                <Dropdown
                  value={form.department}
                  options={departmentOptions}
                  onChange={set('department')}
                  placeholder="Select department"
                  variant="form"
                />
              </div>
            </div>
            <div className="pp-form-row">
              <div className="pp-form-field">
                <label className="pp-form-label">Price (USD)</label>
                <input
                  className="pp-form-input"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={form.price}
                  onChange={update('price')}
                  required
                />
              </div>
              <div className="pp-form-field">
                <label className="pp-form-label">Stock</label>
                <input
                  className="pp-form-input"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={form.stock}
                  onChange={update('stock')}
                  required
                />
              </div>
            </div>
            <div className="pp-form-row">
              <div className="pp-form-field">
                <label className="pp-form-label">Status</label>
                <Dropdown
                  value={form.status}
                  options={statusOptions}
                  onChange={set('status')}
                  placeholder="Select status"
                  variant="form"
                />
              </div>
              <div className="pp-form-field">
                <label className="pp-form-label">Visibility</label>
                <Dropdown
                  value={form.visibility}
                  options={visibilityOptions}
                  onChange={set('visibility')}
                  placeholder="Select visibility"
                  variant="form"
                />
              </div>
            </div>
          </div>
          <div className="pp-modal-footer">
            <button type="button" className="pp-btn pp-btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="pp-btn pp-btn-primary">
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
    <tr className={`pp-table-row${selected ? ' selected' : ''}`}>
      <td className="pp-td-check">
        <Checkbox checked={selected} onChange={onSelect} />
      </td>
      <td className="pp-td-product">
        <div className="pp-product-cell">
          <div className="pp-product-emoji">{product.image}</div>
          <div>
            <div className="pp-product-name">
              {product.name}
              {product.newArrival && <span className="pp-new-tag">NEW</span>}
            </div>
            <div className="pp-product-desc">{product.description}</div>
          </div>
        </div>
      </td>
      <td className="pp-td-id">{product.id}</td>
      <td className="pp-td-category">{product.category}</td>
      <td className="pp-td-price">
        {product.price.toLocaleString()} <span className="pp-currency">{product.currency}</span>
      </td>
      <td className="pp-td-stock">
        <div className="pp-stock-cell">
          <div className={`pp-stock-dot${product.stock === 0 ? ' empty' : product.stock < 200 ? ' low' : ''}`} />
          {product.stock.toLocaleString()}
        </div>
      </td>
      <td className="pp-td-status">
        <StatusBadge status={product.status} />
      </td>
      <td className="pp-td-visibility">
        <Toggle
          checked={product.visibility === 'published'}
          onChange={() => onToggleVisibility(product.id)}
        />
      </td>
      <td className="pp-td-actions">
        <div className="pp-actions-cell">
          <button className="pp-icon-btn" title="Edit">
            <Pencil size={14} />
          </button>
          <div className="pp-actions-more">
            <button className="pp-icon-btn" onClick={() => setMenuOpen(!menuOpen)} title="More">
              <MoreHorizontal size={14} />
            </button>
            {menuOpen && (
              <>
                <div className="pp-dropdown-backdrop" onClick={() => setMenuOpen(false)} />
                <div className="pp-dropdown-menu pp-actions-menu">
                  <button className="pp-dropdown-item"><Eye size={14} /> View on site</button>
                  <button className="pp-dropdown-item"><Copy size={14} /> Duplicate</button>
                  <div className="pp-menu-divider" />
                  <button className="pp-dropdown-item danger"><Trash2 size={14} /> Delete</button>
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
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [department, setDepartment] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [products, setProducts] = useState(allProducts);
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'All Categories' && p.category !== category) return false;
    if (department !== 'All Departments' && p.department !== department) return false;
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
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
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((p) => p.id)));
    }
  };

  const toggleVisibility = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, visibility: p.visibility === 'published' ? 'hidden' : 'published' } : p
      )
    );
  };

  const addProduct = (product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const activeFilterCount = [
    category !== 'All Categories',
    department !== 'All Departments',
    statusFilter !== 'All',
    onlyFeatured,
    onlyInStock,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setCategory('All Categories');
    setDepartment('All Departments');
    setStatusFilter('All');
    setOnlyFeatured(false);
    setOnlyInStock(false);
  };

  return (
    <div className="pp-page animate-in">
      {/* Add Product Modal */}
      <AddProductModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addProduct}
      />

      {/* Toolbar */}
      <div className="pp-toolbar">
        <div className="pp-toolbar-left">
          <div className="pp-search-field">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="pp-search-clear" onClick={() => setSearch('')}>
                <X size={14} />
              </button>
            )}
          </div>
          <button
            className={`pp-btn pp-btn-outline${showFilters ? ' active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span className="pp-filter-count">{activeFilterCount}</span>
            )}
          </button>
        </div>
        <div className="pp-toolbar-right">
          <button className="pp-btn pp-btn-ghost">
            <Download size={15} />
            Export
          </button>
          <button className="pp-btn pp-btn-ghost">
            <Upload size={15} />
            Import
          </button>
          <button className="pp-btn pp-btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} />
            Add product
          </button>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="pp-filters-panel animate-in">
          <div className="pp-filters-row">
            <Dropdown
              value={category}
              options={categories}
              onChange={setCategory}
              placeholder="Category"
            />
            <Dropdown
              value={department}
              options={departments}
              onChange={setDepartment}
              placeholder="Department"
            />
            <Dropdown
              value={statusFilter}
              options={statuses}
              onChange={setStatusFilter}
              placeholder="Status"
            />
            <div className="pp-filter-divider" />
            <Toggle checked={onlyFeatured} onChange={() => setOnlyFeatured(!onlyFeatured)} label="Featured only" />
            <Toggle checked={onlyInStock} onChange={() => setOnlyInStock(!onlyInStock)} label="In stock" />
            {activeFilterCount > 0 && (
              <button className="pp-btn pp-btn-text" onClick={clearFilters}>
                <X size={14} />
                Clear all
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bulk actions bar */}
      {selected.size > 0 && (
        <div className="pp-bulk-bar animate-in">
          <span className="pp-bulk-count">{selected.size} selected</span>
          <div className="pp-bulk-actions">
            <button className="pp-btn pp-btn-sm pp-btn-outline">
              <Eye size={14} /> Publish
            </button>
            <button className="pp-btn pp-btn-sm pp-btn-outline">
              <EyeOff size={14} /> Hide
            </button>
            <button className="pp-btn pp-btn-sm pp-btn-outline pp-btn-danger">
              <Trash2 size={14} /> Delete
            </button>
          </div>
          <button className="pp-btn pp-btn-text pp-btn-sm" onClick={() => setSelected(new Set())}>
            Deselect all
          </button>
        </div>
      )}

      {/* Results count */}
      <div className="pp-results-bar">
        <span className="pp-results-count">
          Showing <strong>{filtered.length}</strong> of {products.length} products
        </span>
        <button className="pp-btn pp-btn-text pp-btn-sm">
          <ArrowUpDown size={13} /> Sort by name
        </button>
      </div>

      {/* Product table */}
      <div className="pp-table-wrap card">
        <table className="pp-table">
          <thead>
            <tr>
              <th className="pp-th-check">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected && !allSelected}
                  onChange={toggleAll}
                />
              </th>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Visible</th>
              <th></th>
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
          <div className="pp-empty-state">
            <div className="pp-empty-icon">📋</div>
            <p className="pp-empty-title">No products match your filters</p>
            <p className="pp-empty-desc">Try adjusting your search or filter criteria</p>
            <button className="pp-btn pp-btn-outline" onClick={clearFilters}>Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
