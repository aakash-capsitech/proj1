import React, { useState, useEffect } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactDataPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const API_BASE_URL = 'http://localhost:5178/api/contacts';

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete contact
  const deleteContact = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      setIsDeleting(id);
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      setContacts(contacts.filter(contact => contact.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete contact');
      console.error('Error deleting contact:', err);
    } finally {
      setIsDeleting(null);
    }
  };

  // Start editing
  const startEdit = (contact: Contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message
    });
    setFormErrors({});
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingContact(null);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setFormErrors({});
  };

  // Validate form
  const validateForm = () => {
    const errors: Partial<FormData> = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (!nameRegex.test(formData.name)) {
      errors.name = 'Name must only contain letters and spaces';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length > 300) {
      errors.message = 'Message must be under 300 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Update contact
  const updateContact = async () => {
    if (!validateForm() || !editingContact) return;

    try {
      setIsUpdating(true);
      const response = await fetch(`${API_BASE_URL}/${editingContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update contact');
      }

      // Update the contact in the local state
      setContacts(contacts.map(contact => 
        contact.id === editingContact.id 
          ? { ...contact, ...formData }
          : contact
      ));

      cancelEdit();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update contact');
      console.error('Error updating contact:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Management</h1>
          <p className="text-gray-600">Manage all submitted contact forms</p>
          <button
            onClick={fetchContacts}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            🔄 Refresh Data
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">❌ {error}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Contacts</h3>
            <p className="text-3xl font-bold text-blue-600">{contacts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
            <p className="text-3xl font-bold text-green-600">
              {contacts.filter(contact => 
                new Date(contact.createdAt).getMonth() === new Date().getMonth()
              ).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Today</h3>
            <p className="text-3xl font-bold text-purple-600">
              {contacts.filter(contact => 
                new Date(contact.createdAt).toDateString() === new Date().toDateString()
              ).length}
            </p>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Contacts</h2>
          </div>

          {contacts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 text-lg">📭 No contacts found</p>
              <p className="text-gray-400 mt-2">Contacts will appear here once submitted</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                          <div className="text-sm text-gray-500">📧 {contact.email}</div>
                          <div className="text-sm text-gray-500">📞 {contact.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {contact.message.length > 100 
                            ? `${contact.message.substring(0, 100)}...` 
                            : contact.message
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(contact.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => startEdit(contact)}
                          className="text-blue-600 hover:text-blue-900 mr-4 px-3 py-1 rounded border border-blue-200 hover:bg-blue-50 transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteContact(contact.id)}
                          disabled={isDeleting === contact.id}
                          className="text-red-600 hover:text-red-900 px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition disabled:opacity-50"
                        >
                          {isDeleting === contact.id ? '⏳' : '🗑️'} Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Edit Contact</h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={300}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      formErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">
                      {formData.message.length}/300 characters
                    </span>
                    {formErrors.message && (
                      <span className="text-red-500">{formErrors.message}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={updateContact}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  {isUpdating ? '⏳ Updating...' : '💾 Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDataPage;