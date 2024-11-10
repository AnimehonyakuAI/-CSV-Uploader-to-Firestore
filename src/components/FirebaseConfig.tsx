import React, { useState, useRef, useEffect } from 'react';
import { Database, Plus, X } from 'lucide-react';
import { firebaseManager, type FirebaseConfig } from '../lib/firebase';

interface FirebaseConfigProps {
  onConfigChange: (configId: string) => void;
  currentConfigId: string;
}

interface NewDatabaseConfig {
  id: string;
  name: string;
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

const FirebaseConfig: React.FC<FirebaseConfigProps> = ({
  onConfigChange,
  currentConfigId
}) => {
  const configs = firebaseManager.getConfigs();
  const [showAddNew, setShowAddNew] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [newConfig, setNewConfig] = useState<NewDatabaseConfig>({
    id: '',
    name: '',
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowAddNew(false);
      }
    };

    if (showAddNew) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddNew]);

  const handleAddNew = () => {
    const config: FirebaseConfig = {
      id: newConfig.id,
      name: newConfig.name,
      config: {
        apiKey: newConfig.apiKey,
        authDomain: newConfig.authDomain,
        projectId: newConfig.projectId,
        storageBucket: newConfig.storageBucket,
        messagingSenderId: newConfig.messagingSenderId,
        appId: newConfig.appId,
        measurementId: newConfig.measurementId
      }
    };

    firebaseConfigs.push(config);
    setShowAddNew(false);
    setNewConfig({
      id: '',
      name: '',
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: ''
    });
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <Database className="w-4 h-4 text-gray-600" />
        <select
          value={currentConfigId}
          onChange={(e) => onConfigChange(e.target.value)}
          className="form-select text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
        >
          {configs.map((config: FirebaseConfig) => (
            <option key={config.id} value={config.id}>
              {config.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowAddNew(true)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          title="Add new database"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showAddNew && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div 
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md my-8"
            style={{ maxHeight: 'calc(100vh - 4rem)' }}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white rounded-t-lg">
              <h2 className="text-xl font-semibold">Add New Database</h2>
              <button
                onClick={() => setShowAddNew(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Database ID
                </label>
                <input
                  type="text"
                  value={newConfig.id}
                  onChange={(e) => setNewConfig(prev => ({ ...prev, id: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., my-app"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={newConfig.name}
                  onChange={(e) => setNewConfig(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., My App"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <input
                  type="text"
                  value={newConfig.apiKey}
                  onChange={(e) => setNewConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Firebase API Key"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Auth Domain
                </label>
                <input
                  type="text"
                  value={newConfig.authDomain}
                  onChange={(e) => setNewConfig(prev => ({ ...prev, authDomain: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your-app.firebaseapp.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project ID
                </label>
                <input
                  type="text"
                  value={newConfig.projectId}
                  onChange={(e) => setNewConfig(prev => ({ ...prev, projectId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your-app-id"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Storage Bucket
                </label>
                <input
                  type="text"
                  value={newConfig.storageBucket}
                  onChange={(e) => setNewConfig(prev => ({ ...prev, storageBucket: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your-app.appspot.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Messaging Sender ID
                </label>
                <input
                  type="text"
                  value={newConfig.messagingSenderId}
                  onChange={(e) => setNewConfig(prev => ({ ...prev, messagingSenderId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  App ID
                </label>
                <input
                  type="text"
                  value={newConfig.appId}
                  onChange={(e) => setNewConfig(prev => ({ ...prev, appId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1:123456789:web:abc123def456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Measurement ID (optional)
                </label>
                <input
                  type="text"
                  value={newConfig.measurementId}
                  onChange={(e) => setNewConfig(prev => ({ ...prev, measurementId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="G-ABC123DEF4"
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-2 sticky bottom-0 bg-white rounded-b-lg">
              <button
                onClick={() => setShowAddNew(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNew}
                disabled={!newConfig.id || !newConfig.name || !newConfig.apiKey}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300"
              >
                Add Database
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirebaseConfig;