import React, { useState } from 'react';
import { TextInput, Select, Textarea, Button, Grid, Text } from '@mantine/core';
import classes from './Contact.module.css';

export function Contact() {
  const [inquiryType, setInquiryType] = useState<string | null>(null);
  const [isExistingCustomer, setIsExistingCustomer] = useState<string | null>(null);

  return (
    <Grid justify="center" align="center" className={classes.root}>
      <Grid.Col span={6}>
        <div>
          <h1 className={classes.heading}>Let&apos;s Talk</h1>
          <Text fz="md">
            Have any questions or need help? Then reach out, we&apos;d love to hear about your
            situation and provide assistance!
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
        <form onSubmit={() => {}}>
          <TextInput placeholder="Name" radius="sm" className={classes.formField} />
          <TextInput placeholder="Email" type="email" radius="sm" className={classes.formField} />
          <Select
            placeholder="What is the nature of your inquiry?"
            data={['General Inquiry', 'Support', 'Partnership', 'Other']}
            value={inquiryType}
            onChange={setInquiryType}
            radius="sm"
            className={classes.formField}
          />
          <Select
            placeholder="Are you an existing Needful customer?"
            data={['Yes', 'No']}
            value={isExistingCustomer}
            onChange={setIsExistingCustomer}
            radius="sm"
            className={classes.formField}
          />
          <Textarea placeholder="Message" radius="sm" className={classes.textareaField} />
          <Button type="submit" radius="sm" className={classes.submitButton}>
            Submit
          </Button>
        </form>
      </Grid.Col>
    </Grid>
  );
}
