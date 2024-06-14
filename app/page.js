"use client"
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

const Review = ({ steps }) => {
  const { name, address, email, phone } = steps;

  return (
    <div style={{ width: '100%' }}>
      <h3>Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{name.value}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{address.value}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{email.value}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{phone.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Review.propTypes = {
  steps: PropTypes.object.isRequired,
};

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}! What is your address?',
            trigger: 'address',
          },
          {
            id: 'address',
            user: true,
            trigger: '5',
          },
          {
            id: '5',
            message: 'What is your email?',
            trigger: 'email',
          },
          {
            id: 'email',
            user: true,
            trigger: '7',
            validator: (value) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                return 'Please enter a valid email address';
              }
              return true;
            },
          },
          {
            id: '7',
            message: 'What is your phone number?',
            trigger: 'phone',
          },
          {
            id: 'phone',
            user: true,
            trigger: '9',
            validator: (value) => {
              const phoneRegex = /^[0-9\b]+$/;
              if (!phoneRegex.test(value)) {
                return 'Please enter a valid phone number';
              }
              return true;
            },
          },
          {
            id: '9',
            message: 'Great! Check out your summary',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Would you like to update some field?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Name', trigger: 'update-name' },
              { value: 'address', label: 'Address', trigger: 'update-address' },
              { value: 'email', label: 'Email', trigger: 'update-email' },
              { value: 'phone', label: 'Phone', trigger: 'update-phone' },
            ],
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '9',
          },
          {
            id: 'update-address',
            update: 'address',
            trigger: '9',
          },
          {
            id: 'update-email',
            update: 'email',
            trigger: '9',
          },
          {
            id: 'update-phone',
            update: 'phone',
            trigger: '9',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            trigger: 'invest',
          },
          {
            id: 'invest',
            message: 'Would you like to invest with us?',
            trigger: 'invest-question',
          },
          {
            id: 'invest-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'invest-yes' },
              { value: 'no', label: 'No', trigger: 'invest-no' },
            ],
          },
          {
            id: 'invest-yes',
            message: 'please contact at 1234567890',
            end: true,
          },
          {
            id: 'invest-no',
            message: 'contact help and support 1234567890!',
            trigger: 'invest',
          },

        ]}
      />
    </div>

  );
};

export default App;
