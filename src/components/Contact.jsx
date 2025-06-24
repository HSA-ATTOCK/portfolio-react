// import React, { useState } from "react";
// import emailjs from "emailjs-com";
// import "../styles/contact.css";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const [submitStatus, setSubmitStatus] = useState({
//     isSuccess: false,
//     message: "",
//     isVisible: false,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitStatus({
//       isSuccess: false,
//       message: "Sending...",
//       isVisible: true,
//     });

//     emailjs
//       .send(
//         "service_davtv8a",
//         "template_x216ebb",
//         formData,
//         "m0Sfq8Hqr8DuOkUh0"
//       )
//       .then(
//         (response) => {
//           setSubmitStatus({
//             isSuccess: true,
//             message: "Message sent successfully!",
//             isVisible: true,
//           });
//           setFormData({
//             name: "",
//             email: "",
//             phone: "",
//             subject: "",
//             message: "",
//           });
//         },
//         (error) => {
//           setSubmitStatus({
//             isSuccess: false,
//             message: "Failed to send message. Please try again.",
//             isVisible: true,
//           });
//         }
//       );
//   };

//   return (
//     <section className="contact" id="contact">
//       <h2 className="heading">
//         Contact <span>Me!</span>
//       </h2>

//       {submitStatus.isVisible && (
//         <div
//           className={`status-message ${
//             submitStatus.isSuccess ? "success" : "error"
//           }`}
//         >
//           {submitStatus.message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div className="input-box">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="input-box">
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Mobile Number"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="subject"
//             placeholder="Email Subject"
//             value={formData.subject}
//             onChange={handleChange}
//           />
//         </div>
//         <textarea
//           name="message"
//           cols="30"
//           rows="10"
//           placeholder="Your Message"
//           value={formData.message}
//           onChange={handleChange}
//           required
//         ></textarea>
//         <button type="submit" className="btn">
//           Send Message
//         </button>
//       </form>
//     </section>
//   );
// };

// export default Contact;

import React, { useState } from "react";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("http://localhost:3001/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus({
        success: true,
        message: "Message sent successfully!",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.message || "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <h2 className="heading">
        Contact <span>Me!</span>
      </h2>

      {submitStatus && (
        <div
          className={`status-message ${
            submitStatus.success ? "success" : "error"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="Email Subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="message"
          cols="30"
          rows="10"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default Contact;
