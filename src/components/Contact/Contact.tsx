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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_n85uype", // Replace with your EmailJS service ID
        "template_mv2ncmi", // Replace with your EmailJS template ID
        {
          from_name: formData.user_name, // Map to {{from_name}} in your template
          from_email: formData.user_email, // Map to {{from_email}} in your template
          phone_number: formData.phone_number,
          message: formData.message, // Map to {{message}} in your template
          inquiry_type: inquiryType, // Additional field
          is_existing_customer: isExistingCustomer, // Additional field
        },
        "GDBpND8iESVP9uYQp" // Replace with your EmailJS public key
      )
      .then(
        () => {
          setSuccessMessage("Your message has been sent successfully!");
          setErrorMessage("");
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
          setErrorMessage("Failed to send your message. Please try again.");
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
          />
          <TextInput
            placeholder="Email"
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            radius="sm"
            className={classes.formField}
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
            onChange={setInquiryType}
            radius="sm"
            className={classes.formField}
          />
          <Select
            placeholder="Are you an existing Needful customer?"
            data={["Yes", "No"]}
            value={isExistingCustomer}
            onChange={setIsExistingCustomer}
            radius="sm"
            className={classes.formField}
          />
          <Textarea
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            radius="sm"
            className={classes.textareaField}
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
