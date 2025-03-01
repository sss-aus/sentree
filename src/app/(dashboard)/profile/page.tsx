"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { z } from "zod";
import {
  FaUser,
  FaEnvelope,
  FaImage,
  FaInfoCircle,
  FaTrashAlt,
  FaPlus,
  FaLightbulb,
  FaHeart,
} from "react-icons/fa";

// Zod schema for profile form validation
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  description: z.string().optional(),
  hobbies: z.array(
    z.object({
      hobby: z.string().min(1, "Hobby is required"),
      description: z.string().optional(),
    })
  ),
  skills: z.array(
    z.object({
      skill: z.string().min(1, "Skill is required"),
      description: z.string().optional(),
    })
  ),
});

type Hobby = { hobby: string; description?: string };
type Skill = { skill: string; description?: string };

export default function Profile() {
  // Pre-filled user data for demonstration
  const [name, setName] = useState("John Doe");
  const [email] = useState("john@example.com"); // read-only
  const [description, setDescription] = useState("A passionate developer.");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  // Hobbies
  const handleAddHobby = () => {
    setHobbies([...hobbies, { hobby: "", description: "" }]);
  };

  const handleHobbyChange = (
    index: number,
    field: keyof Hobby,
    value: string
  ) => {
    const newHobbies = [...hobbies];
    newHobbies[index] = { ...newHobbies[index], [field]: value };
    setHobbies(newHobbies);
  };

  const handleRemoveHobby = (index: number) => {
    const newHobbies = [...hobbies];
    newHobbies.splice(index, 1);
    setHobbies(newHobbies);
  };

  // Skills
  const handleAddSkill = () => {
    setSkills([...skills, { skill: "", description: "" }]);
  };

  const handleSkillChange = (
    index: number,
    field: keyof Skill,
    value: string
  ) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setSkills(newSkills);
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      description,
      hobbies,
      skills,
    };

    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path.join(".")] = err.message;
      });
      setErrors(fieldErrors);
      setMessage("");
      return;
    }

    // If validation passes, clear errors and simulate a successful update.
    setErrors({});
    setMessage("Profile updated successfully!");
    // API call to update profile can be added here.
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
        Update Your Profile
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture */}
        <div>
          <label className="block text-gray-700 mb-2 flex items-center">
            <FaImage className="mr-2" /> Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-blue-300 file:text-blue-700 file:bg-blue-50 hover:file:bg-blue-100"
          />
          {profilePicture && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-300"
              />
            </div>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700 mb-2 flex items-center">
            <FaUser className="mr-2" /> Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-gray-700 mb-2 flex items-center">
            <FaEnvelope className="mr-2" /> Email
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="border px-4 py-2 w-full rounded bg-gray-200 cursor-not-allowed"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2 flex items-center">
            <FaInfoCircle className="mr-2" /> Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Hobbies */}
        <div>
          <label className="block text-gray-700 mb-2 flex items-center">
            <FaHeart className="mr-2" /> Hobbies
          </label>
          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className="border p-4 rounded mb-4 bg-white shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Hobby {index + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveHobby(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Hobby"
                  value={hobby.hobby}
                  onChange={(e) =>
                    handleHobbyChange(index, "hobby", e.target.value)
                  }
                  className="border px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors[`hobbies.${index}.hobby`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`hobbies.${index}.hobby`]}
                  </p>
                )}
              </div>
              <div>
                <textarea
                  placeholder="Hobby Description"
                  value={hobby.description}
                  onChange={(e) =>
                    handleHobbyChange(index, "description", e.target.value)
                  }
                  className="border px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={2}
                />
                {errors[`hobbies.${index}.description`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`hobbies.${index}.description`]}
                  </p>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddHobby}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
          >
            <FaPlus className="mr-2" /> Add Hobby
          </button>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-gray-700 mb-2 flex items-center">
            <FaLightbulb className="mr-2" /> Skills
          </label>
          {skills.map((skill, index) => (
            <div
              key={index}
              className="border p-4 rounded mb-4 bg-white shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Skill {index + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Skill"
                  value={skill.skill}
                  onChange={(e) =>
                    handleSkillChange(index, "skill", e.target.value)
                  }
                  className="border px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors[`skills.${index}.skill`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`skills.${index}.skill`]}
                  </p>
                )}
              </div>
              <div>
                <textarea
                  placeholder="Skill Description"
                  value={skill.description}
                  onChange={(e) =>
                    handleSkillChange(index, "description", e.target.value)
                  }
                  className="border px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={2}
                />
                {errors[`skills.${index}.description`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`skills.${index}.description`]}
                  </p>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSkill}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
          >
            <FaPlus className="mr-2" /> Add Skill
          </button>
        </div>

        {/* Submission Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 text-lg"
          >
            Update Profile
          </button>
        </div>
        {message && (
          <p className="text-green-600 mt-4 text-center">{message}</p>
        )}
      </form>
    </div>
  );
}
