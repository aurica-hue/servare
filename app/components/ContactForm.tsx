"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    jobField: "",
    experience: "",
    currentSituation: "",
    goals: "",
    additionalInfo: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      })

      if (response.ok) {
        alert("Thank you for joining our waitlist! We'll be in touch soon.")
      } else if (response.status === 409) {
        alert("This email is already on our waitlist.")
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error joining waitlist:", error)
      alert("Network error. Please check your connection and try again.")
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-black/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="text-white">
            Full Name *
          </Label>
          <Input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-white">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-white">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <Label htmlFor="jobField" className="text-white">
          Job Field/Industry *
        </Label>
        <Select onValueChange={(value) => handleChange("jobField", value)}>
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent className="bg-black border-gray-700">
            <SelectItem value="technology" className="text-white hover:bg-gray-800">
              Technology
            </SelectItem>
            <SelectItem value="healthcare" className="text-white hover:bg-gray-800">
              Healthcare
            </SelectItem>
            <SelectItem value="finance" className="text-white hover:bg-gray-800">
              Finance
            </SelectItem>
            <SelectItem value="marketing" className="text-white hover:bg-gray-800">
              Marketing
            </SelectItem>
            <SelectItem value="sales" className="text-white hover:bg-gray-800">
              Sales
            </SelectItem>
            <SelectItem value="education" className="text-white hover:bg-gray-800">
              Education
            </SelectItem>
            <SelectItem value="consulting" className="text-white hover:bg-gray-800">
              Consulting
            </SelectItem>
            <SelectItem value="manufacturing" className="text-white hover:bg-gray-800">
              Manufacturing
            </SelectItem>
            <SelectItem value="retail" className="text-white hover:bg-gray-800">
              Retail
            </SelectItem>
            <SelectItem value="other" className="text-white hover:bg-gray-800">
              Other
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="experience" className="text-white">
          Years of Experience
        </Label>
        <Select onValueChange={(value) => handleChange("experience", value)}>
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select experience level" />
          </SelectTrigger>
          <SelectContent className="bg-black border-gray-700">
            <SelectItem value="entry" className="text-white hover:bg-gray-800">
              Entry Level (0-2 years)
            </SelectItem>
            <SelectItem value="mid" className="text-white hover:bg-gray-800">
              Mid Level (3-5 years)
            </SelectItem>
            <SelectItem value="senior" className="text-white hover:bg-gray-800">
              Senior Level (6-10 years)
            </SelectItem>
            <SelectItem value="executive" className="text-white hover:bg-gray-800">
              Executive Level (10+ years)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="currentSituation" className="text-white">
          Current Employment Situation
        </Label>
        <Select onValueChange={(value) => handleChange("currentSituation", value)}>
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select your current situation" />
          </SelectTrigger>
          <SelectContent className="bg-black border-gray-700">
            <SelectItem value="employed-looking" className="text-white hover:bg-gray-800">
              Currently employed, looking for new opportunities
            </SelectItem>
            <SelectItem value="unemployed" className="text-white hover:bg-gray-800">
              Currently unemployed
            </SelectItem>
            <SelectItem value="student" className="text-white hover:bg-gray-800">
              Student/Recent graduate
            </SelectItem>
            <SelectItem value="freelancer" className="text-white hover:bg-gray-800">
              Freelancer/Contractor
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="goals" className="text-white">
          Career Goals
        </Label>
        <Textarea
          id="goals"
          value={formData.goals}
          onChange={(e) => handleChange("goals", e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="What are your career goals? What type of role are you seeking?"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="additionalInfo" className="text-white">
          Additional Information
        </Label>
        <Textarea
          id="additionalInfo"
          value={formData.additionalInfo}
          onChange={(e) => handleChange("additionalInfo", e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="Any additional information you'd like to share about your job search or career needs?"
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-3">
        Join Waitlist
      </Button>
    </form>
  )
}
