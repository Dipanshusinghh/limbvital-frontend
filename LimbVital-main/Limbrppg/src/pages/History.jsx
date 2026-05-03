import React, { useState, useEffect } from 'react';
import { Clock, Heart, TrendingUp, TrendingDown, Calendar, Download, Trash2 } from 'lucide-react';
const History = () => {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('all');
  // ── Load from localStorage ──────────────────────────────────────────────
  useEffect(() => {
    loadRecords();
  }, []);
  const loadRecords = () => {
    try {
      const saved = localStorage.getItem('limbvital_records');
      setRecords(saved ? JSON.parse(saved) : []);
    } catch (e) {
      setRecords([]);
    }
  };
  // ── Delete a single record ──────────────────────────────────────────────
  const deleteRecord = (index) => {
    const updated = records.filter((_, i) => i !== index);
    setRecords(updated);
    localStorage.setItem('limbvital_records', JSON.stringify(updated));
  };
  // ── Clear all records ───────────────────────────────────────────────────
  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all history? This cannot be undone.')) {
      localStorage.removeItem('limbvital_records');
      setRecords([]);
    }
  };
  // ── Filter logic ────────────────────────────────────────────────────────
  const getFilteredRecords = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    return records.filter((record) => {
      const d = new Date(record.timestamp);
      if (filter === 'today') return d >= today;
      if (filter === 'week') return d >= weekAgo;
      if (filter === 'month') return d >= monthAgo;
      return true;
    });
  };
  const filteredRecords = getFilteredRecords();
  // ── Stats ───────────────────────────────────────────────────────────────
  const getStats = () => {
    if (filteredRecords.length === 0)
      return { avgBpm: 0, avgSpo2: 0, avgStress: 0, totalScans: 0 };
    const sum = filteredRecords.reduce(
      (acc, r) => ({ bpm: acc.bpm + r.bpm, spo2: acc.spo2 + r.spo2, stress: acc.stress + (r.stress ?? 0) }),
      { bpm: 0, spo2: 0, stress: 0 }
    );
    const n = filteredRecords.length;
    return {
      avgBpm: Math.round(sum.bpm / n),
      avgSpo2: Math.round(sum.spo2 / n),
      avgStress: Math.round(sum.stress / n),
      totalScans: n,
    };
  };
  const stats = getStats();
  // ── CSV Export ──────────────────────────────────────────────────────────
  const exportToCSV = () => {
    const headers = ['Date', 'Time', 'BPM', 'SpO2', 'Stress', 'Status'];
    const rows = filteredRecords.map((r) => {
      const d = new Date(r.timestamp);
      return [d.toLocaleDateString(), d.toLocaleTimeString(), r.bpm, r.spo2, r.stress ?? 0, r.status ?? 'Completed'].join(',');
    });
    const csv = [headers.join(','), ...rows].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `limbvital_history_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Health History</h1>
          <p className="text-gray-600">Track your vitals over time</p>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Heart className="w-6 h-6" />} label="Avg Heart Rate" value={stats.avgBpm} unit="BPM" color="from-red-500 to-pink-600" />
          <StatCard icon={<TrendingUp className="w-6 h-6" />} label="Avg SpO2" value={stats.avgSpo2} unit="%" color="from-blue-500 to-cyan-600" />
          <StatCard icon={<TrendingDown className="w-6 h-6" />} label="Avg Stress" value={stats.avgStress} unit="/100" color="from-purple-500 to-indigo-600" />
          <StatCard icon={<Calendar className="w-6 h-6" />} label="Total Scans" value={stats.totalScans} unit="" color="from-green-500 to-emerald-600" />
        </div>
        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {['all', 'today', 'week', 'month'].map((f) => (
                <FilterButton key={f} active={filter === f} onClick={() => setFilter(f)}>
                  {f === 'all' ? 'All Time' : f === 'today' ? 'Today' : f === 'week' ? 'This Week' : 'This Month'}
                </FilterButton>
              ))}
            </div>
            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={exportToCSV}
                disabled={filteredRecords.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Download className="w-4 h-4" /> Export CSV
              </button>
              <button
                onClick={clearAll}
                disabled={records.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
            </div>
          </div>
        </div>
        {/* Records */}
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Records Found</h3>
            <p className="text-gray-500">
              {records.length === 0
                ? 'Complete a scan on the dashboard and click Stop Scan to save your reading here!'
                : 'No records found for the selected time period.'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date & Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Heart Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">SpO2</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Stress</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRecords.map((record, index) => (
                    <RecordRow key={record.timestamp + index} record={record} index={index} onDelete={deleteRecord} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
// ── Sub-components ──────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, unit, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${color} text-white mb-3`}>
      {icon}
    </div>
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <div className="flex items-baseline space-x-1">
      <span className="text-3xl font-bold text-gray-900">{value || '—'}</span>
      {unit && <span className="text-lg text-gray-500">{unit}</span>}
    </div>
  </div>
);
const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-all ${
      active
        ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {children}
  </button>
);
const RecordRow = ({ record, index, onDelete }) => {
  const date = new Date(record.timestamp);
  const bpmColor = record.bpm < 60 || record.bpm > 100 ? 'text-yellow-600' : 'text-green-600';
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <p className="font-medium text-gray-900">{date.toLocaleDateString()}</p>
        <p className="text-sm text-gray-500">{date.toLocaleTimeString()}</p>
      </td>
      <td className="px-6 py-4">
        <span className={`font-semibold ${bpmColor}`}>{record.bpm} BPM</span>
      </td>
      <td className="px-6 py-4">
        <span className="font-semibold text-blue-600">{record.spo2}%</span>
      </td>
      <td className="px-6 py-4">
        <span className="font-semibold text-purple-600">{record.stress ?? 0}</span>
      </td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          {record.status || 'Completed'}
        </span>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => onDelete(index)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};
export default History;