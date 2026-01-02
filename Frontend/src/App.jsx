import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StatsDashboard from './components/StatsDashboard';
import ContactTable from './components/ContactTable';
import ContactDetailModal from './components/ContactDetailModal';
import ContactFormModal from './components/ContactFormModal';
import Alert from './components/Alert';
import { contactAPI } from './services/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '', show: false });
  
  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  
  // Sorting and filtering states
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate stats
  const calculateStats = () => {
    const today = new Date().toDateString();
    const todayContacts = contacts.filter(contact => {
      const contactDate = new Date(contact.createdAt).toDateString();
      return today === contactDate;
    }).length;

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekContacts = contacts.filter(contact => 
      new Date(contact.createdAt) > weekAgo
    ).length;

    return {
      totalContacts: contacts.length,
      todayContacts,
      weekContacts,
      growthRate: contacts.length > 10 ? Math.floor((todayContacts / contacts.length) * 100) : 25,
      activeUsers: Math.floor(contacts.length * 0.8)
    };
  };

  const showAlert = (type, message) => {
    setAlert({ type, message, show: true });
  };

  const hideAlert = () => {
    setAlert({ type: '', message: '', show: false });
  };

  // Fetch contacts from API
  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await contactAPI.getAllContacts();
      setContacts(response.data || []);
      setFilteredContacts(response.data || []);
    } catch (error) {
      showAlert('error', error.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const response = await contactAPI.createContact(formData);
      setContacts([response.data, ...contacts]);
      showAlert('success', 'Contact added successfully!');
      fetchContacts(); // Refresh the list
    } catch (error) {
      showAlert('error', error.message || 'Failed to add contact');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle contact deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
      try {
        await contactAPI.deleteContact(id);
        setContacts(contacts.filter(contact => contact._id !== id));
        showAlert('success', 'Contact deleted successfully!');
      } catch (error) {
        showAlert('error', error.message || 'Failed to delete contact');
      }
    }
  };

  // Handle view contact details
  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setIsDetailModalOpen(true);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    
    let sortedContacts = [...filteredContacts];
    
    switch (newSortBy) {
      case 'name_asc':
        sortedContacts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        sortedContacts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'oldest':
        sortedContacts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'newest':
      default:
        sortedContacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    
    setFilteredContacts(sortedContacts);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const newFilterBy = e.target.value;
    setFilterBy(newFilterBy);
    setCurrentPage(1);
    
    let filtered = [...contacts];
    const now = new Date();
    
    switch (newFilterBy) {
      case 'today':
        filtered = contacts.filter(contact => {
          const contactDate = new Date(contact.createdAt);
          return contactDate.toDateString() === now.toDateString();
        });
        break;
      case 'week':
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = contacts.filter(contact => 
          new Date(contact.createdAt) > weekAgo
        );
        break;
      case 'month':
        const monthAgo = new Date(now);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        filtered = contacts.filter(contact => 
          new Date(contact.createdAt) > monthAgo
        );
        break;
      case 'all':
      default:
        filtered = contacts;
        break;
    }
    
    // Apply current sort to filtered results
    switch (sortBy) {
      case 'name_asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    
    setFilteredContacts(filtered);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <Header 
        totalContacts={stats.totalContacts} 
        todayContacts={stats.todayContacts}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert */}
        {alert.show && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={hideAlert}
          />
        )}

        {/* Stats Dashboard */}
        <StatsDashboard
          stats={stats}
          onAddContact={() => setIsFormModalOpen(true)}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          filterBy={filterBy}
          onFilterChange={handleFilterChange}
        />

        {/* Contact Table */}
        <div className="mb-8">
          <ContactTable
            contacts={filteredContacts}
            onView={handleViewContact}
            onDelete={handleDelete}
            isLoading={loading}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">
                Contact Management System &copy; {new Date().getFullYear()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Built with MERN Stack • React • Tailwind CSS • MongoDB
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">Made with 🩷 By Amit Yadav </span>
              <div className="flex items-center space-x-2">
              
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleSubmit}
        isLoading={submitting}
      />

      {/* Contact Detail Modal */}
      {selectedContact && (
        <ContactDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          contact={selectedContact}
        />
      )}
    </div>
  );
}

export default App;