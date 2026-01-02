import axios from 'axios';

const API_URL =  'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contacts API
export const contactAPI = {
  // Get all contacts
  getAllContacts: async () => {
    try {
      const response = await api.get('/contacts');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch contacts';
    }
  },

  // Get single contact
  getContact: async (id) => {
    try {
      const response = await api.get(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch contact';
    }
  },

  // Create a new contact
  createContact: async (contactData) => {
    try {
      const response = await api.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to create contact';
    }
  },

  // Delete a contact
  deleteContact: async (id) => {
    try {
      const response = await api.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to delete contact';
    }
  },
};

export default api;