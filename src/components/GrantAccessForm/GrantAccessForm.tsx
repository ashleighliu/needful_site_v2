import React, { useState } from "react";
import { TextInput, Button, Text } from "@mantine/core";
import { IconArrowRight, IconX } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import classes from "./GrantAccessForm.module.css";
import { getUserInfo } from "@/store/slices/userSlice";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

export function GrantAccessForm() {
  const [inputEmail, setInputEmail] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string | null>(null);

  const userInfo = useSelector(getUserInfo);

  // Custom email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleAddEmail = () => {
    if (emails.length >= 12) {
      setEmailError("You can only add up to 12 email addresses.");
      return;
    }

    if (validateEmail(inputEmail)) {
      if (!emails.includes(inputEmail)) {
        setEmails([...emails, inputEmail]);
        setInputEmail(""); // Reset input field after adding
        setEmailError(null); // Clear any existing error message
      } else {
        setEmailError("Email already added.");
      }
    } else {
      setEmailError("Please enter a valid email address.");
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (emails.length > 0) {
      for (let email of emails) {
        await addDoc(collection(db, "employees"), {
          associatedOwnerId: userInfo.userId,
          email,
          name: email,
        });
      }
    } else {
      alert("Please add at least one valid email address.");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.logo}></div>
      <Text className={classes.title}>Grant Access to Your Team</Text>
      <Text className={classes.description}>
        Please enter the email addresses of up to 12 employees you wish to grant
        access to your subscription. Ensure each email address is correct and
        associated with an active employee account.
      </Text>

      <form onSubmit={handleSubmit} className={classes.form}>
        <Text className={classes.label}>Employee Email Addresses:</Text>
        <div className={classes.inputContainer}>
          <TextInput
            placeholder="Enter an email address..."
            value={inputEmail}
            onChange={(event) => setInputEmail(event.currentTarget.value)}
            className={classes.input}
            radius="md"
            error={emailError} // Display error message
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} // Prevent form submission on Enter key press
            disabled={emails.length >= 12} // Disable input if 12 emails have been added
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleAddEmail();
            }}
            className={classes.addButton}
            radius="md"
            disabled={emails.length >= 12} // Disable button if 12 emails have been added
          >
            <IconArrowRight size={20} />
          </Button>
        </div>
        {emails.map((email, index) => (
          <div key={index} className={classes.emailItem}>
            <Text className={classes.emailText}>{email}</Text>
            <Button
              variant="subtle"
              onClick={() => handleRemoveEmail(email)}
              className={classes.removeButton}
              radius="md"
            >
              <IconX size={20} />
            </Button>
          </div>
        ))}
        <Button type="submit" className={classes.submitButton} radius="md">
          Next
        </Button>
      </form>
    </div>
  );
}
