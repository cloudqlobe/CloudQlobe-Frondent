import React, { useState, useEffect } from 'react';

const CCRateModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const dataModel={
    countryCode: "",
    country: "",
    qualityDescription: "",
    status: "Inactive",
    profile: "",
    rate: "",
    category: "",
    testStatus: "as",
    specialRate: false,
    addToTicker: false,
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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h3 className='text-lg font-semibold mb-4'>
          {initialData ? "Update Rate" : "Add New Rate"}
        </h3>
        <form onSubmit={handleAddLead}>
          <input
            type='text'
            placeholder='Country Code'
            value={newLead.countryCode}
            onChange={(e) =>
              setNewLead({ ...newLead, countryCode: e.target.value })
            }
            className='mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg'
            required
          />
          <input
            type='text'
            placeholder='Country'
            value={newLead.country}
            onChange={(e) =>
              setNewLead({ ...newLead, country: e.target.value })
            }
            className='mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg'
            required
          />
          <input
            type='text'
            placeholder='Quality Description'
            value={newLead.qualityDescription}
            onChange={(e) =>
              setNewLead({ ...newLead, qualityDescription: e.target.value })
            }
            className='mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg'
            required
          />
          <select
            value={newLead?.profile || ""}
            onChange={(e) =>
              setNewLead({ ...newLead, profile: e.target.value })
            }
            className='mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg'>
            <option value='' disabled>
              Select Profile
            </option>
            <option value='Outbound'>Outbound</option>
            <option value='IVR'>IVR</option>
          </select>

          <input
            type='number'
            placeholder='Enter Rate'
            value={newLead?.rate || ""}
            onChange={(e) => setNewLead({ ...newLead, rate: e.target.value })}
            className='mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg'
          />
          <label className='flex items-center mb-4'>
            <input
              type='checkbox'
              checked={newLead.specialRate}
              onChange={(e) =>
                setNewLead({ ...newLead, specialRate: e.target.checked })
              }
              className='mr-2'
            />
            Special Rate
          </label>
          <label className='flex items-center mb-4'>
            <span className='mr-2'>Status:</span>
            <select
              value={newLead.status}
              onChange={(e) =>
                setNewLead({ ...newLead, status: e.target.value })
              }
              className='border border-gray-300 rounded-lg px-2 py-1'>
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
            </select>
          </label>
          <label className='flex items-center mb-4'>
            <input
              type='checkbox'
              checked={newLead.addToTicker}
              onChange={(e) =>
                setNewLead({ ...newLead, addToTicker: e.target.checked })
              }
              className='mr-2'
            />
            Add to Ticker
          </label>
          <div className='flex justify-between mt-4'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200'>
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200'>
              {initialData ? "Update Rate" : "Add Rate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CCRateModal;