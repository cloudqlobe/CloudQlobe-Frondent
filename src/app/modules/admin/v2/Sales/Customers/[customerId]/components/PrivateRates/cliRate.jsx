import React, { useState, useEffect } from 'react';

const CliRateModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const dataModel = {
    countryCode: '',
    country: '',
    qualityDescription: '',
    rate: '',
    status: 'Inactive',
    billingCycle: '',
    rtp: '',
    asr: '',
    acd: '',
    ticker: false,
    testStatus: 'na',
  }
  const [newLead, setNewLead] = useState(initialData || dataModel);

  useEffect(() => {
    if (initialData) {
      setNewLead(initialData);
    } else {
      setNewLead(dataModel);
    }
  }, [initialData]);

  const handleAddLead = (e) => {
    e.preventDefault();
    onSubmit(newLead);
    setNewLead(dataModel);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">{initialData ? 'Update Rate' : 'Add New Rate'}</h3>
        <form onSubmit={handleAddLead}>
          <input type="text" placeholder="Country Code" value={newLead.countryCode} onChange={(e) => setNewLead({ ...newLead, countryCode: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          <input type="text" placeholder="Country" value={newLead.country} onChange={(e) => setNewLead({ ...newLead, country: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          <input type="text" placeholder="Quality Description" value={newLead.qualityDescription} onChange={(e) => setNewLead({ ...newLead, qualityDescription: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          <input type="number" placeholder="Rate" value={newLead.rate} onChange={(e) => setNewLead({ ...newLead, rate: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          <input type="text" placeholder="Billing Cycle" value={newLead.billingCycle} onChange={(e) => setNewLead({ ...newLead, billingCycle: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <input type="text" placeholder="RTP" value={newLead.rtp} onChange={(e) => setNewLead({ ...newLead, rtp: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <input type="text" placeholder="ASR" value={newLead.asr} onChange={(e) => setNewLead({ ...newLead, asr: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <input type="text" placeholder="ACD" value={newLead.acd} onChange={(e) => setNewLead({ ...newLead, acd: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <label className="flex items-center mb-4">
            <span className="mr-2">Status:</span>
            <select
              value={newLead.status}
              onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
              className="border border-gray-300 rounded-lg px-2 py-1"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" checked={newLead.ticker} onChange={(e) => setNewLead({ ...newLead, ticker: e.target.checked })} className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2">Add to Ticker</span>
            </label>
          </div>

          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">{initialData ? 'Update Rate' : 'Add Rate'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CliRateModal;