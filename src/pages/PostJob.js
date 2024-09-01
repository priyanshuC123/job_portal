import React, { useState } from 'react';
import Select from 'react-select';
import { postJob } from '../firebase/jobs';

const universities = [
  { value: 'IIT Delhi', label: 'IIT Delhi' },
  { value: 'IIT Bombay', label: 'IIT Bombay' },
  { value: 'IIT Kharagpur', label: 'IIT Kharagpur' },
  { value: 'IIT Madras', label: 'IIT Madras' },
  { value: 'IIT Kanpur', label: 'IIT Kanpur' },
  { value: 'IIT Roorkee', label: 'IIT Roorkee' },
  { value: 'IIT Guwahati', label: 'IIT Guwahati' },
  { value: 'IIT Hyderabad', label: 'IIT Hyderabad' },
  { value: 'IIT Bhubaneswar', label: 'IIT Bhubaneswar' },
  { value: 'IIT Gandhinagar', label: 'IIT Gandhinagar' },
  { value: 'NIT Trichy', label: 'NIT Trichy' },
  { value: 'NIT Warangal', label: 'NIT Warangal' },
  { value: 'NIT Surathkal', label: 'NIT Surathkal' },
  { value: 'NIT Rourkela', label: 'NIT Rourkela' },
  { value: 'NIT Calicut', label: 'NIT Calicut' },
  { value: 'NIT Durgapur', label: 'NIT Durgapur' },
  { value: 'NIT Jamshedpur', label: 'NIT Jamshedpur' },
  { value: 'NIT Kurukshetra', label: 'NIT Kurukshetra' },
  { value: 'NIT Silchar', label: 'NIT Silchar' },
  { value: 'NIT Hamirpur', label: 'NIT Hamirpur' },
  { value: 'BITS Pilani', label: 'BITS Pilani' },
  { value: 'VIT Vellore', label: 'VIT Vellore' },
  { value: 'IIIT Hyderabad', label: 'IIIT Hyderabad' },
  { value: 'DTU Delhi', label: 'DTU Delhi' },
];

const PostJob = ({ employerId }) => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salaryRange: '',
    employmentType: 'Full-time',
    allowedColleges: [],
  });

  if (!employerId) {
    console.error('Employer ID is undefined');
    return <div>Error: Employer ID is required to post a job.</div>;
  }

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleCollegesChange = (selectedOptions) => {
    setJobData({ ...jobData, allowedColleges: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postJob({ ...jobData, employerId });
    alert('Job posted successfully!');
    setJobData({
      title: '',
      description: '',
      requirements: '',
      location: '',
      salaryRange: '',
      employmentType: 'Full-time',
      allowedColleges: [],
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      borderRadius: '0.375rem',
      padding: '0.5rem',
      border: '1px solid #e2e8f0',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#cbd5e0',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '0.75rem',
      backgroundColor: state.isSelected ? '#e2e8f0' : state.isFocused ? '#edf2f7' : 'white',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#e2e8f0',
      borderRadius: '0.375rem',
    }),
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20 p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Post a Job</h1>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                className="border rounded-lg w-full py-2 px-4 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                className="border rounded-lg w-full py-2 px-4 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Salary Range</label>
              <input
                type="text"
                name="salaryRange"
                value={jobData.salaryRange}
                onChange={handleChange}
                className="border rounded-lg w-full py-2 px-4 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Employment Type</label>
              <select
                name="employmentType"
                value={jobData.employmentType}
                onChange={handleChange}
                className="border rounded-lg w-full py-2 px-4 text-gray-700"
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Job Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              className="border rounded-lg w-full py-2 px-4 text-gray-700"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Requirements</label>
            <input
              type="text"
              name="requirements"
              value={jobData.requirements}
              onChange={handleChange}
              className="border rounded-lg w-full py-2 px-4 text-gray-700"
              placeholder="Comma separated requirements"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Allowed Colleges</label>
            <Select
              isMulti
              options={universities}
              value={jobData.allowedColleges}
              onChange={handleCollegesChange}
              styles={customStyles}
              placeholder="Select colleges..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
