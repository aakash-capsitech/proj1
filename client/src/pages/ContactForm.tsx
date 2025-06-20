import React, { useState } from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Copyright from '../components/Copyright';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialData: FormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touched, setTouched] = useState<{ [K in keyof FormData]?: boolean }>({});
  const [submitted, setSubmitted] = useState(false);

  const maxMessageLength = 300;

  const validate = (field = '', value = '') => {
    let newErrors: Partial<FormData> = { ...errors };

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (field === 'name' || !field) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required.';
      } else if (!nameRegex.test(formData.name)) {
        newErrors.name = 'Name must only contain letters and spaces.';
      } else {
        delete newErrors.name;
      }
    }

    if (field === 'email' || !field) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required.';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      } else {
        delete newErrors.email;
      }
    }

    if (field === 'phone' || !field) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required.';
      } else if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits.';
      } else {
        delete newErrors.phone;
      }
    }

    if (field === 'message' || !field) {
      if (!formData.message.trim()) {
        newErrors.message = 'Message is required.';
      } else if (formData.message.length > maxMessageLength) {
        newErrors.message = `Message must be under ${maxMessageLength} characters.`;
      } else {
        delete newErrors.message;
      }
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name as keyof FormData]) {
      validate(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validate(name);
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const validationErrors = validate();
  //   if (Object.keys(validationErrors).length === 0) {
  //     console.log('Form submitted:', formData);
  //     setSubmitted(true);
  //     setFormData(initialData);
  //     setTouched({});
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length === 0) {
    try {
      const response = await fetch('http://localhost:5178/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData(initialData);
        setTouched({});
      } else {
        const errorData = await response.json();
        console.error('Failed to submit form:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
};

  const isValid = Object.keys(errors).length === 0 && 
    formData.name.trim() && 
    formData.email.trim() && 
    formData.phone.trim() && 
    formData.message.trim();

  return (
    <div className='max-w-[1280px'> 
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>

      {submitted && (
        <div className="mb-6 text-green-600 font-semibold text-center">
          ✅ Your message has been sent successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`mt-1 block w-full border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm px-4 py-2`}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`mt-1 block w-full border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm px-4 py-2`}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="email@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block font-medium text-gray-700">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={`mt-1 block w-full border ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm px-4 py-2`}
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="9876543210"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block font-medium text-gray-700">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={`mt-1 block w-full border ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm px-4 py-2 resize-none`}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Write your message..."
            maxLength={maxMessageLength}
          ></textarea>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">
              {formData.message.length}/{maxMessageLength} characters
            </span>
            {errors.message && <span className="text-red-500">{errors.message}</span>}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={!isValid}
            className={`px-6 py-3 rounded-full font-semibold text-white ${
              isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            } transition duration-300`}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
    <div>
        <Contact />
        <Footer />
        <Copyright />
      </div>
    </div>
  );
};

export default ContactForm;