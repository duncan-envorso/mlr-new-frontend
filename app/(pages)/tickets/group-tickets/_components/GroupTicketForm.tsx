'use client'

import { FormEvent, useState } from 'react'

export default function GroupTicketForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredCommunication: ''
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block mb-1 font-medium">
          First Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
          placeholder="First Name"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block mb-1 font-medium">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Last Name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
          placeholder="Email"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block mb-1 font-medium">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Phone"
        />
      </div>
      <div>
        <label htmlFor="preferredCommunication" className="block mb-1 font-medium">
          What is your preferred method of communication?<span className="text-red-500">*</span>
        </label>
        <select
          id="preferredCommunication"
          name="preferredCommunication"
          value={formData.preferredCommunication}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">What is your preferred method of communication?</option>
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
        </select>
      </div>
      <div>
        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          Submit
        </button>
      </div>
    </form>
  )
}

