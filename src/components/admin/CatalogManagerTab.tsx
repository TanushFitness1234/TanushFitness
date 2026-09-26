import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, X, Save, Package } from 'lucide-react';
import { EQUIPMENT_CATEGORIES } from '../../data/categories';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

export const CatalogManagerTab: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, showToast, accessToken } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [categoryId, setCategoryId] = useState('c1');
  const [equipmentType, setEquipmentType] = useState('Strength');
  const [minOrderQty, setMinOrderQty] = useState(1);
  const [leadTime, setLeadTime] = useState('7-14 Days');
  const [badge, setBadge] = useState('Commercial-Grade');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setBrand('');
    setCategoryId('c1');
    setEquipmentType('Strength');
    setMinOrderQty(1);
    setLeadTime('7-14 Days');
    setBadge('Commercial-Grade');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setBrand(p.brand);
    setCategoryId(p.categoryId);
    setEquipmentType(p.equipmentType || 'Strength');
    setMinOrderQty(p.minOrderQty || 1);
    setLeadTime(p.leadTime || '7-14 Days');
    setBadge(p.badge || '');
    setDescription(p.description || '');
    setImage(p.image);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const catObj = EQUIPMENT_CATEGORIES.find(c => c.id === categoryId);

    const payload = {
      name,
      brand,
      categoryId,
      categoryName: catObj ? catObj.name : 'Commercial Equipment',
      equipmentType,
      minOrderQty,
      leadTime,
      badge,
      description,
      image: image || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      fetch(`http://localhost:5000/api/admin/catalog/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }).catch(err => console.log('Backend sync notice:', err.message));
    } else {
      addProduct(payload);
      fetch('http://localhost:5000/api/admin/catalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }).catch(err => console.log('Backend sync notice:', err.message));
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, prodName: string) => {
    if (window.confirm(`Are you sure you want to delete "${prodName}" from the catalog?`)) {
      deleteProduct(id);
      fetch(`http://localhost:5000/api/admin/catalog/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).catch(err => console.log('Backend sync notice:', err.message));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner - Modern Light */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" /> Equipment & Machinery Catalog Manager
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Directly add, edit, or toggle stock & MOQs for treadmills, racks, and selectorized stacks on the live website.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl transition shadow-md shadow-blue-600/20 shrink-0 text-sm"
        >
          <Plus className="w-4 h-4" /> Add New Equipment
        </button>
      </div>

      {/* Catalog Table - Modern Light Cool Blue */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <th className="py-4 px-6">Equipment</th>
                <th className="py-4 px-6">Brand & Category</th>
                <th className="py-4 px-6">MOQ & Lead Time</th>
                <th className="py-4 px-6">Badge / Specs</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {products.map(p => (
                <tr key={p.id} className="odd:bg-[#F4F9FF] even:bg-white hover:bg-[#E4F0FF] transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center p-1 shrink-0">
                        <img src={p.image} alt={p.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{p.name}</div>
                        <div className="text-xs text-slate-500 font-medium font-mono">ID: {p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-900 font-bold">{p.brand}</div>
                    <div className="text-xs text-blue-700 font-semibold">{p.category}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800 font-semibold">MOQ: {p.minOrderQty || 1} Units</div>
                    <div className="text-xs text-slate-500 font-medium">{p.leadTime || '7-14 Days'}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-300">
                      <CheckCircle className="w-3 h-3 text-amber-700" /> {p.badge || 'Commercial-Grade'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 rounded-lg border border-slate-200 transition shadow-sm"
                        title="Edit Equipment"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 rounded-lg transition shadow-sm"
                        title="Delete Equipment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal - Modern Light */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                {editingProduct ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-blue-600" />}
                {editingProduct ? 'Edit Catalog Equipment' : 'Add New Commercial Equipment'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Equipment Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Commercial Pin-Loaded Leg Extension"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    placeholder="e.g. Tanush Strength / Jerai"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={categoryId}
                    onChange={e => setCategoryId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  >
                    {EQUIPMENT_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Equipment Type</label>
                  <select
                    value={equipmentType}
                    onChange={e => setEquipmentType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  >
                    <option value="Cardio">Cardio Equipment</option>
                    <option value="Strength">Strength Equipment</option>
                    <option value="Free Weights">Free Weights</option>
                    <option value="Functional">Functional Training</option>
                    <option value="Flooring">Flooring & Turf</option>
                    <option value="Stretching & Recovery">Stretching & Recovery</option>
                    <option value="Boxing & Combat">Boxing & Combat</option>
                    <option value="Studio & Group Fitness">Studio & Group Fitness</option>
                    <option value="Outdoor Fitness">Outdoor Fitness</option>
                    <option value="Accessories">Accessories & Gym Essentials</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Min Order Qty (MOQ)</label>
                  <input
                    type="number"
                    min="1"
                    value={minOrderQty}
                    onChange={e => setMinOrderQty(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lead Time</label>
                  <input
                    type="text"
                    value={leadTime}
                    onChange={e => setLeadTime(e.target.value)}
                    placeholder="e.g. 7-14 Days"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quality Badge</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={e => setBadge(e.target.value)}
                    placeholder="e.g. Commercial-Grade, Heavy Duty"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Enter detailed B2B specifications, steel gauge, weight stack size..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition shadow-md shadow-blue-600/20"
                >
                  <Save className="w-4 h-4" /> Save Equipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
