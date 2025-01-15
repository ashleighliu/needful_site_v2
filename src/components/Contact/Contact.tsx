import React, { useState } from "react";
import { TextInput, Select, Textarea, Button, Grid, Text } from "@mantine/core";
import emailjs from "@emailjs/browser";
import classes from "./Contact.module.css";

export function Contact() {
  const [inquiryType, setInquiryType] = useState<string | null>(null);
  const [isExistingCustomer, setIsExistingCustomer] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    phone_number: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    user_name: "",
    user_email: "",
    inquiry_type: "",
    is_existing_customer: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Ensure 'name' is one of the valid keys of fieldErrors
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name as keyof typeof prevErrors]: value.trim()
        ? ""
        : prevErrors[name as keyof typeof prevErrors], // Clear error if field has value
    }));

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Initialize field-specific error states
    const errors = {
      user_name: "",
      user_email: "",
      inquiry_type: "",
      is_existing_customer: "",
      message: "",
    };

    // Validate each field
    if (!formData.user_name.trim()) {
      errors.user_name = "Name is required.";
    }
    if (!formData.user_email.trim()) {
      errors.user_email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      errors.user_email = "Invalid email format.";
    }
    if (!inquiryType) {
      errors.inquiry_type = "Inquiry type is required.";
    }
    if (!isExistingCustomer) {
      errors.is_existing_customer = "Customer status is required.";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required.";
    }

    // Check if there are any errors
    if (Object.values(errors).some((error) => error !== "")) {
      setFieldErrors(errors);
      return;
    }

    // Clear field-specific errors on successful validation
    setFieldErrors({
      user_name: "",
      user_email: "",
      inquiry_type: "",
      is_existing_customer: "",
      message: "",
    });

    setIsSubmitting(true);

    emailjs
      .send(
        "service_z0dcp0f", // Replace with your EmailJS service ID
        "template_y6g4pch", // Replace with your EmailJS template ID
        {
          from_name: formData.user_name,
          from_email: formData.user_email,
          phone_number: formData.phone_number,
          message: formData.message,
          inquiry_type: inquiryType,
          is_existing_customer: isExistingCustomer,
        },
        "jZMOwmyN-HjBBoCP4" // Replace with your EmailJS public key
      )
      .then(
        () => {
          setSuccessMessage("Your message has been sent successfully!");
          setFormData({
            user_name: "",
            user_email: "",
            phone_number: "",
            message: "",
          });
          setInquiryType(null);
          setIsExistingCustomer(null);
        },
        (error) => {
          console.error("Error:", error);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Grid justify="center" align="center" className={classes.root}>
      <Grid.Col span={6}>
        <div>
          <h1 className={classes.heading}>Let&apos;s Talk</h1>
          <Text fz="md">
            Have any questions or need help? Then reach out, we&apos;d love to
            hear about your situation and provide assistance!
          </Text>
          <div className={classes.emailSection}>
            <Text className={classes.sectionTitle}>Email</Text>
            <Text
              component="a"
              href="mailto:admin@needful.site"
              target="_blank"
              rel="noopener noreferrer"
              fz="md"
              className={classes.emailSectionText}
              style={{ textDecoration: "underline", color: "inherit" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00A884")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              admin@needful.site
            </Text>
          </div>
          <div className={classes.socialsSection}>
            <Text className={classes.sectionTitle}>Socials</Text>
            <Text
              fz="md"
              className={classes.socialsSectionText}
              style={{ marginBottom: "8px" }}
            >
              <a
                href="https://www.instagram.com/needful.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline", color: "inherit" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00A884")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
              >
                Instagram
              </a>
            </Text>
            <Text
              fz="md"
              className={classes.socialsSectionText}
              style={{ marginBottom: "8px" }}
            >
              <a
                href="https://twitter.com/needfulapp/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline", color: "inherit" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00A884")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
              >
                Twitter
              </a>
            </Text>
            <Text
              fz="md"
              className={classes.socialsSectionText}
              style={{ marginBottom: "8px" }}
            >
              <a
                href="https://www.facebook.com/needfulapp/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline", color: "inherit" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00A884")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
              >
                Facebook
              </a>
            </Text>
            <Text
              fz="md"
              className={classes.socialsSectionText}
              style={{ marginBottom: "8px" }}
            >
              <a
                href="https://www.linkedin.com/company/needfulapp/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline", color: "inherit" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00A884")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
              >
                LinkedIn
              </a>
            </Text>
          </div>
        </div>
      </Grid.Col>

      <Grid.Col span={6}>
        <form onSubmit={handleSubmit}>
          <TextInput
            placeholder="Name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            radius="sm"
            className={classes.formField}
            error={
              fieldErrors.user_name && (
                <Text
                  style={{
                    marginTop: "8px",
                    color: "red",
                    fontSize: "0.875rem",
                  }}
                >
                  {fieldErrors.user_name}
                </Text>
              )
            }
          />
          <TextInput
            placeholder="Email"
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            radius="sm"
            className={classes.formField}
            error={
              fieldErrors.user_email && (
                <Text
                  style={{
                    marginTop: "8px",
                    color: "red",
                    fontSize: "0.875rem",
                  }}
                >
                  {fieldErrors.user_email}
                </Text>
              )
            }
          />
          <TextInput
            placeholder="Phone Number (Optional)"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            radius="sm"
            className={classes.formField}
          />
          <Select
            placeholder="What is the nature of your inquiry?"
            data={["General Inquiry", "Support", "Partnership", "Other"]}
            value={inquiryType}
            onChange={(value) => {
              setInquiryType(value);
              setFieldErrors((prevErrors) => ({
                ...prevErrors,
                inquiry_type: value ? "" : prevErrors.inquiry_type,
              }));
            }}
            radius="sm"
            className={classes.formField}
            error={
              fieldErrors.inquiry_type && (
                <Text
                  style={{
                    marginTop: "8px",
                    color: "red",
                    fontSize: "0.875rem",
                  }}
                >
                  {fieldErrors.inquiry_type}
                </Text>
              )
            }
          />
          <Select
            placeholder="Are you an existing Needful customer?"
            data={["Yes", "No"]}
            value={isExistingCustomer}
            onChange={(value) => {
              setIsExistingCustomer(value);
              setFieldErrors((prevErrors) => ({
                ...prevErrors,
                is_existing_customer: value
                  ? ""
                  : prevErrors.is_existing_customer,
              }));
            }}
            radius="sm"
            className={classes.formField}
            error={
              fieldErrors.is_existing_customer && (
                <Text
                  style={{
                    marginTop: "8px",
                    color: "red",
                    fontSize: "0.875rem",
                  }}
                >
                  {fieldErrors.is_existing_customer}
                </Text>
              )
            }
          />
          <Textarea
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            radius="sm"
            className={classes.textareaField}
            error={
              fieldErrors.message && (
                <Text
                  style={{
                    marginTop: "8px",
                    color: "red",
                    fontSize: "0.875rem",
                  }}
                >
                  {fieldErrors.message}
                </Text>
              )
            }
          />

          <Button
            type="submit"
            radius="sm"
            className={classes.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
          {successMessage && <Text color="green">{successMessage}</Text>}
          {errorMessage && <Text color="red">{errorMessage}</Text>}
        </form>
      </Grid.Col>
    </Grid>
  );
}
