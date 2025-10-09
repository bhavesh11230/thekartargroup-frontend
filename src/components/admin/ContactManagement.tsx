import React, { useState, useEffect } from 'react';
import { apiService } from '../../utils/api';
import { toast } from 'react-toastify';
import { Trash2, Loader2, Mail, Calendar, FileText, CheckCircle, XCircle } from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  requestCatalogue: string;
  status: string;
  createdAt: string;
}

const ContactManagement: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deletingContactId, setDeletingContactId] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllContacts();
      setContacts(response.data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contact messages');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedContact) return;

    try {
      setDeletingContactId(selectedContact._id);
      await apiService.deleteContact(selectedContact._id);
      toast.success('Contact message deleted successfully');
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact message');
    } finally {
      setDeletingContactId(null);
      setShowDialog(false);
      setSelectedContact(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-kartar-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-kartar-gold mb-6">
          Contact Messages
        </h2>

        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No contact messages yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {contact.name}
                      </h3>
                      {contact.status === 'new' && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          New
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <a
                          href={`mailto:${contact.email}`}
                          className="hover:text-kartar-gold transition-colors duration-200"
                        >
                          {contact.email}
                        </a>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(contact.createdAt)}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">Catalogue Request:</span>
                        {contact.requestCatalogue === 'yes' ? (
                          <span className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Yes</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-gray-500">
                            <XCircle className="h-4 w-4" />
                            <span>No</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">
                        Message:
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {contact.message}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => confirmDelete(contact)}
                    className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 ml-4"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDialog && selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the message from{' '}
              <span className="font-medium">{selectedContact.name}</span>?
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center"
                disabled={deletingContactId === selectedContact._id}
              >
                {deletingContactId === selectedContact._id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;