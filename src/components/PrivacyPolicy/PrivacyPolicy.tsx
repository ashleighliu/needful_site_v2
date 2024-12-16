import React from "react";
import { Container, Title, Text, Stack, Box } from "@mantine/core";

export function PrivacyPolicy() {
  return (
    <Container size="lg" py="xl" mt={100}>
      <Stack>
        {/* Header Section */}
        <Box>
          <Title
            order={1}
            fz={"2.5rem"}
            mb={"md"}
            style={{
              color: "#00A884",
            }}
          >
            Privacy Policy for Needful
          </Title>

          <Text fw={500} mb="xs">
            Effective Date: January 1, 2025
          </Text>

          <Text mb="md">
            Thank you for using Needful. At Needful, your privacy is our
            priority. This Privacy Policy explains how we collect, use, and
            protect your information when you use our app, website, and related
            services.
          </Text>

          <Text mb="lg">
            By using Needful, you agree to the collection and use of your
            information in accordance with this Privacy Policy.
          </Text>
        </Box>

        {/* Information We Collect */}
        <Box>
          <Title order={2} size="h3" mb="md">
            1. Information We Collect
          </Title>

          <Stack>
            <Box>
              <Title order={3} size="h4" mb="sm">
                1.1 Information You Provide to Us
              </Title>
              <Stack>
                <Text>
                  • Account Information: When you sign up, we collect your name,
                  email address, and other necessary details.
                </Text>
                <Text>
                  • Profile Information: If you choose, you can provide
                  additional information to personalize your experience.
                </Text>
                <Text>
                  • Communications: If you contact us or participate in surveys,
                  we collect the information you share.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={3} size="h4" mb="sm">
                1.2 Information We Automatically Collect
              </Title>
              <Stack>
                <Text>
                  • Usage Data: We collect information about your interactions
                  with Needful, such as features used, session duration, and
                  errors.
                </Text>
                <Text>
                  • Device Information: Includes IP address, browser type,
                  device type, and operating system.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={3} size="h4" mb="sm">
                1.3 Information from Third-Party Services
              </Title>
              <Stack>
                <Text>
                  • Social Sign-Ins: If you sign in using Facebook, Google, or
                  other services, we receive basic profile details such as your
                  name and email address.
                </Text>
                <Text>
                  • Third-Party Integrations: Information shared through
                  integrations or permissions you grant.
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* How We Use Your Information */}
        <Box>
          <Title order={2} size="h3" mb="md">
            2. How We Use Your Information
          </Title>
          <Stack>
            <Text>• Provide, improve, and personalize the Needful app.</Text>
            <Text>
              • Communicate updates, product announcements, and support.
            </Text>
            <Text>• Ensure compliance with legal obligations.</Text>
            <Text>
              • Monitor and improve the performance and security of our
              services.
            </Text>
          </Stack>
        </Box>

        {/* How We Share Your Information */}
        <Box>
          <Title order={2} size="h3" mb="md">
            3. How We Share Your Information
          </Title>
          <Text mb="md">
            We do not sell your personal information. We may share your
            information in the following cases:
          </Text>
          <Stack>
            <Text>
              • Service Providers: Trusted third parties help us operate,
              maintain, or analyze Needful. They are bound by confidentiality
              agreements.
            </Text>
            <Text>
              • Legal Compliance: When required to comply with laws,
              regulations, or legal proceedings.
            </Text>
            <Text>
              • Business Transfers: In case of a merger, acquisition, or sale of
              assets, your data may be transferred as part of the transaction.
            </Text>
          </Stack>
        </Box>

        {/* Your Privacy Choices */}
        <Box>
          <Title order={2} size="h3" mb="md">
            4. Your Privacy Choices and Account Deletion
          </Title>
          <Stack>
            {/* General Privacy Choices */}
            <Box>
              <Title order={3} size="h4" mb="sm">
                4.1 General Privacy Options
              </Title>
              <Stack>
                <Text>
                  • Access and Update: You can update or correct your information
                  directly within the app or by contacting us at admin@needful.site.
                </Text>
                <Text>
                  • Opt-Out of Communications: You can unsubscribe from promotional
                  emails at any time by following the link in the email.
                </Text>
              </Stack>
            </Box>

            {/* Account Deletion Process */}
            <Box>
              <Title order={3} size="h4" mb="sm">
                4.2 Account Deletion Process
              </Title>
              <Stack>
                <Text>You can delete your account through the following methods:</Text>
                <Text>• In-App: Settings - Account - Delete Account</Text>
                <Text>• Email: Send a deletion request to admin@needful.site</Text>
                <Text>• Support: Contact our support team through the app's help section</Text>
              </Stack>
            </Box>

            {/* Data Deletion Details */}
            <Box>
              <Title order={3} size="h4" mb="sm">
                4.3 Data Deletion Scope
              </Title>
              <Stack>
                <Text>When you delete your account, we will remove:</Text>
                <Text>• All personal account information</Text>
                <Text>• User preferences and settings</Text>
                <Text>• App usage history</Text>
                <Text>• Content and data you've created</Text>
                <Text>• Authentication information</Text>
              </Stack>
            </Box>

            {/* Retention Period */}
            <Box>
              <Title order={3} size="h4" mb="sm">
                4.4 Data Retention Period
              </Title>
              <Stack>
                <Text>After requesting account deletion:</Text>
                <Text>• Your account will be deactivated immediately</Text>
                <Text>• Account data will be permanently deleted within 30 days</Text>
                <Text>• Backup data will be removed within 90 days</Text>
                <Text>• Some anonymized usage data may be retained for analytics purposes</Text>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* Data Retention */}
        <Box>
          <Title order={2} size="h3" mb="md">
            5. Data Retention
          </Title>
          <Text>
            We retain your personal information for as long as necessary to
            provide the services and fulfill the purposes described in this
            Privacy Policy unless a longer retention period is required by law.
          </Text>
        </Box>

        {/* Data Security */}
        <Box>
          <Title order={2} size="h3" mb="md">
            6. Data Security
          </Title>
          <Text>
            We use industry-standard measures to protect your information.
            However, no online platform is 100% secure. Please notify us
            immediately if you suspect unauthorized access to your account.
          </Text>
        </Box>

        {/* Third-Party Links */}
        <Box>
          <Title order={2} size="h3" mb="md">
            7. Third-Party Links
          </Title>
          <Text>
            Needful may include links to third-party websites or services. This
            Privacy Policy does not apply to those third parties. Please review
            their privacy policies independently.
          </Text>
        </Box>

        {/* Children's Privacy */}
        <Box>
          <Title order={2} size="h3" mb="md">
            8. Children's Privacy
          </Title>
          <Text>
            Needful is not directed at individuals under the age of 13 (or the
            applicable age in your jurisdiction). We do not knowingly collect
            personal information from children without parental consent.
          </Text>
        </Box>

        {/* Your Rights */}
        <Box>
          <Title order={2} size="h3" mb="md">
            9. Your Rights
          </Title>
          <Text mb="md">
            Depending on your location, you may have the following rights:
          </Text>
          <Stack>
            <Text>• Request access to or deletion of your personal data.</Text>
            <Text>• Object to or restrict the processing of your data.</Text>
            <Text>• Data portability rights.</Text>
          </Stack>
          <Text mt="md">
            To exercise these rights, contact us at admin@needful.site
          </Text>
        </Box>

        {/* Changes to This Privacy Policy */}
        <Box>
          <Title order={2} size="h3" mb="md">
            10. Changes to This Privacy Policy
          </Title>
          <Text>
            We may update this Privacy Policy from time to time. Significant
            changes will be communicated to you through the app or by email.
            Continued use of Needful after any updates constitutes your
            agreement to the revised Privacy Policy.
          </Text>
        </Box>

        {/* Contact Us */}
        <Box>
          <Title order={2} size="h3" mb="md">
            11. Contact Us
          </Title>
          <Text>
            If you have any questions or concerns about this Privacy Policy or
            our practices, contact us at: admin@needful.site
          </Text>
        </Box>
      </Stack>
    </Container>
  );
}
