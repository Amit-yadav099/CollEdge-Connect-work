import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { X, User, Mail, Phone, MessageSquare } from 'lucide-react';

ReactModal.setAppElement('#root');

const ContactFormModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (formData.message.length > 500) {
      newErrors.message = 'Message cannot exceed 500 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    !isLoading;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="outline-none"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl">

        {/* HEADER */}
        <div className="px-8 py-6 border-b flex items-center justify-between">
          <div>
            <h2 className="px-2 text-xl font-semibold  text-gray-800">
              Add New Contact
            </h2>
            <p className="text-sm text-gray-500">
              Enter contact details below
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSubmit} className="px-8 py-6">
          <div className="grid grid-cols-2 gap-6">

            {/* NAME */}
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Amit Yadav"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Amit@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
              
            </div>

            {/* PHONE */}
            <div className="col-span-2">
              <label className="flex items-center text-sm font-medium mb-2">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+91 (123) 456-7892"
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* MESSAGE */}
            <div className="col-span-2">
              <label className="flex items-center text-sm font-medium mb-2">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Write your message...'
              />
              <div className="flex justify-between mt-1 text-sm text-gray-500">
                {errors.message && (
                  <span className="text-red-500">{errors.message}</span>
                )}
                <span>{formData.message.length}/500</span>
              </div>
            </div>
          </div>
        </form>

        {/* FOOTER */}
        <div className="px-8 py-6 border-t flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Adding...' : 'Add Contact'}
          </button>
        </div>

      </div>
    </ReactModal>
  );
};

export default ContactFormModal;
