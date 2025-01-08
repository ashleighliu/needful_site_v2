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
        "service_z0dcp0f", // Replace with your EmailJS service ID
        "template_y6g4pch", // Replace with your EmailJS template ID
        {
          ...formData,
          inquiry_type: inquiryType,
          is_existing_customer: isExistingCustomer,
        },
        "jZMOwmyN-HjBBoCP4" // Replace with your EmailJS public key
      )
      .then(
        () => {
          setSuccessMessage("Your message has been sent successfully!");
          setErrorMessage("");
          setFormData({ user_name: "", user_email: "", message: "" });
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
            <Text fz="md" className={classes.emailSectionText}>
              needful@email.com
            </Text>
          </div>
          <div className={classes.socialsSection}>
            <Text className={classes.sectionTitle}>Socials</Text>
            <Text fz="md" className={classes.socialsSectionText}>
              <a href="https://www.instagram.com">Instagram</a>
            </Text>
            <Text fz="md" className={classes.socialsSectionText}>
              <a href="https://www.twitter.com">Twitter</a>
            </Text>
            <Text fz="md" className={classes.socialsSectionText}>
              <a href="https://www.facebook.com">Facebook</a>
            </Text>
            <Text fz="md" className={classes.socialsSectionText}>
              <a href="https://www.linkedin.com">LinkedIn</a>
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
