import React from 'react';
import { Users, Phone, Mail, Calendar } from 'lucide-react';

const Header = ({ totalContacts, todayContacts }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-6">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Contact Manager</h1>
              <p className="text-blue-100 mt-1">Organize and manage your contacts efficiently</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center bg-white/20 p-3 rounded-full">
                <Phone className="h-6 w-6" />
              </div>
              <p className="text-sm mt-2">Easy Contact</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center bg-white/20 p-3 rounded-full">
                <Mail className="h-6 w-6" />
              </div>
              <p className="text-sm mt-2">Quick Email</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center bg-white/20 p-3 rounded-full">
                <Calendar className="h-6 w-6" />
              </div>
              <p className="text-sm mt-2">Track History</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;