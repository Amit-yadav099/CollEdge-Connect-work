import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import { X, User, Mail, Phone, MessageSquare, Calendar, Clock, MapPin, Globe } from 'lucide-react';

// Make sure to bind modal to your appElement
if (typeof window !== 'undefined') {
  ReactModal.setAppElement('#root');
}

const ContactDetailModal = ({ isOpen, onClose, contact }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const getRandomColor = (str) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-green-500 to-green-600',
      'bg-gradient-to-br from-orange-500 to-orange-600',
      'bg-gradient-to-br from-red-500 to-red-600'
    ];
    const index = str.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl mx-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`${getRandomColor(contact?.name)} text-white w-12 h-12 rounded-full flex items-center justify-center`}>
              <span className="text-xl font-bold">{getInitial(contact?.name || '')}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{contact?.name}</h2>
              <p className="text-gray-600">Contact Details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-500 p-2 rounded-lg mr-3">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Email Address</h3>
                  </div>
                  <p className="text-gray-700 mb-2">{contact?.email}</p>
                  <a
                    href={`mailto:${contact?.email}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Send Email
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-500 p-2 rounded-lg mr-3">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Phone Number</h3>
                  </div>
                  <p className="text-gray-700 mb-2">{contact?.phone}</p>
                  <a
                    href={`tel:${contact?.phone}`}
                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
                  >
                    Call Now
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-500 p-2 rounded-lg mr-3">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Message</h3>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {contact?.message || 'No message provided by the contact.'}
                  </p>
                </div>
                {contact?.message && (
                  <div className="mt-3 text-sm text-gray-600">
                    {contact.message.length} characters • {contact.message.split(/\s+/).length} words
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Metadata */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 pl-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-gray-200 p-2 rounded-lg mr-3">
                      <Calendar className="h-4 w-4 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date Added</p>
                      <p className="font-medium text-gray-800">{formatDate(contact?.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-200 p-2 rounded-lg mr-3">
                      <Clock className="h-4 w-4 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time Added</p>
                      <p className="font-medium text-gray-800">{formatTime(contact?.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-200 p-2 rounded-lg mr-3">
                      <Globe className="h-4 w-4 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact ID</p>
                      <p className="font-medium text-gray-800 font-mono">{contact?._id}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-200 p-2 rounded-lg mr-3">
                      <User className="h-4 w-4 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Name Length</p>
                      <p className="font-medium text-gray-800">{contact?.name?.length} characters</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Last updated: {formatDate(contact?.createdAt)} at {formatTime(contact?.createdAt)}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Close
              </button>
             
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

// Modal styles
const modalStyles = `
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: transparent;
    border: none;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    .modal-content {
      margin: 10px;
    }
  }
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = modalStyles;
  document.head.appendChild(style);
}

export default ContactDetailModal;