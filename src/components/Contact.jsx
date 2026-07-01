"use client";
import React, { useState } from "react";
import "../styles/contact.css";
import { Vortex } from "@/components/ui/vortex.jsx";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

const EMPTY_FORM = { name: "", email: "", phone: "", subject: "", message: "" };

const Contact = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = (data) => {
    const errs = {};
    if (!data.name.trim()) errs.name = "Full name is required.";
    if (!data.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!data.subject.trim()) errs.subject = "Subject is required.";
    if (!data.message.trim()) errs.message = "Message is required.";
    if (data.phone.trim() && !PHONE_REGEX.test(data.phone.trim())) {
      errs.phone = "Invalid phone number (e.g. +92 300 1234567).";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    const clientErrors = validate(formData);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Server returned field-level errors
        if (data.errors) {
          setErrors(data.errors);
        }
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitStatus({ success: true, message: data.message });
      setFormData(EMPTY_FORM);
    } catch (error) {
      if (!Object.keys(errors).length) {
        setSubmitStatus({
          success: false,
          message: error.message || "Failed to send message. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact relative" id="contact">
      {/* Vortex Background - Hidden on Mobile */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={220}
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        />
      </div>

      <div className="relative z-10">
        <h2 className="heading">
          Contact <span>Me!</span>
        </h2>

        {submitStatus && (
          <div className={`status-message ${submitStatus.success ? "success" : "error"}`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Row 1: Name + Email (both required) */}
          <div className="input-box">
            <div className="input-field-wrapper">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="input-field-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
          </div>

          {/* Row 2: Phone (optional) + Subject (required) */}
          <div className="input-box">
            <div className="input-field-wrapper">
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number (optional)"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "input-error" : ""}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
            <div className="input-field-wrapper">
              <input
                type="text"
                name="subject"
                placeholder="Email Subject *"
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? "input-error" : ""}
              />
              {errors.subject && <span className="field-error">{errors.subject}</span>}
            </div>
          </div>

          {/* Message (required) */}
          <div className="input-field-wrapper">
            <textarea
              name="message"
              cols="30"
              rows="10"
              placeholder="Your Message *"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? "input-error" : ""}
            ></textarea>
            {errors.message && <span className="field-error">{errors.message}</span>}
          </div>

          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
