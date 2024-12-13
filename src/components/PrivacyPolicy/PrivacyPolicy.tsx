import React from "react";
import { Container, Title, Text, Stack, Box } from "@mantine/core";

export function PrivacyPolicy() {
  return (
    <Container size="lg" py="xl" mt={100}>
      {/* Terms & Conditions Section */}
      <Stack>
        {/* Privacy Policy Section */}
        <Box>
          <Title
            order={1}
            fz={"2.5rem"}
            mb={"md"}
            style={{
              color: "#00A884",
            }}
          >
            Privacy Policy
          </Title>

          <Text mb="md">
            Thank you for choosing needful (the "App"). This Privacy Policy is
            meant to help you understand what data we collect, why we collect
            it, and how we use it. We value your trust in us and are committed
            to protecting your privacy.
          </Text>

          <Text mb="lg">
            By using the App, you consent to the collection and use of
            information in accordance with this Privacy Policy. If you do not
            agree with any part of this Privacy Policy, please do not use the
            App.
          </Text>
        </Box>
        <Box>
          <Title order={2} size="h3" mb="md">
            1. Information we collect
          </Title>

          <Stack>
            <Box>
              <Text fw={500}>a. Personal Information:</Text>
              <Text>
                We may collect personal information such as your name, email
                address, and payment information when you register or make
                purchases within the App.
              </Text>
            </Box>

            <Box>
              <Text fw={500}>b. Usage Information:</Text>
              <Text>
                We may collect information about how you use the App, including
                your interactions with features, content, and advertisements.
              </Text>
            </Box>

            <Box>
              <Text fw={500}>c. Device Information:</Text>
              <Text>
                We may collect information about your device, including its
                model, operating system, unique device identifiers, and mobile
                network information.
              </Text>
            </Box>

            <Box>
              <Text fw={500}>d. Log Data:</Text>
              <Text>
                Like many apps, we automatically collect log data when you use
                the App. This may include your IP address, browser type, device
                type, the pages of our App that you visit, and other statistics.
              </Text>
            </Box>
          </Stack>
        </Box>
        <Box>
          <Title order={2} size="h3" mb="md">
            2. How We Use Your Information
          </Title>

          <Stack>
            <Box>
              <Text fw={500}>a. To Provide and Improve the App:</Text>
              <Text>
                We use the information we collect to operate, maintain, and
                improve the App's functionality, features, and performance.
              </Text>
            </Box>

            <Box>
              <Text fw={500}>b. To Personalize Your Experience:</Text>
              <Text>
                We may use your information to tailor your experience within the
                App, including providing personalized content, recommendations,
                and advertisements.
              </Text>
            </Box>

            <Box>
              <Text fw={500}>c. To Communicate With You:</Text>
              <Text>
                We may use your email address to send you important updates,
                newsletters, and promotional offers. You can opt-out of
                receiving promotional emails at any time.
              </Text>
            </Box>

            <Box>
              <Text fw={500}>d. To Protect Our Rights:</Text>
              <Text>
                We may use your information to investigate, prevent, or take
                action regarding illegal activities, violations of our terms of
                service, or as otherwise required by law.
              </Text>
            </Box>
          </Stack>
        </Box>
        <Box>
          <Title order={2} size="h3" mb="md">
            3. How We Share Your Information
          </Title>

          <Stack>
            <Box>
              <Text fw={500}>a. Third-Party Service Providers:</Text>
              <Text>
                We may share your information with third-party service providers
                who help us operate, maintain, and improve the App. These
                service providers are bound by confidentiality agreements and
                are prohibited from using your information for any other
                purpose.
              </Text>
            </Box>

            <Box>
              <Text fw={500}>b. Legal Requirements:</Text>
              <Text>
                We may disclose your information in response to lawful requests
                by public authorities, including to meet national security or
                law enforcement requirements.
              </Text>
            </Box>

            <Box>
              <Text fw={500}>c. Business Transfers:</Text>
              <Text>
                In the event of a merger, acquisition, or sale of all or a
                portion of our assets, your information may be transferred as
                part of the transaction.
              </Text>
            </Box>
          </Stack>
        </Box>
        <Box>
          <Title order={2} size="h3" mb="md">
            4. Your Choices
          </Title>

          <Stack>
            <Box>
              <Text fw={500}>a. Opt-Out:</Text>
              <Text>
                You may opt-out of receiving promotional emails by following the
                instructions provided in the email. Please note that even if you
                opt-out of receiving promotional emails, we may still send you
                important updates about the App.
              </Text>
            </Box>

            <Box>
              <Text fw={500}>b. Do Not Track:</Text>
              <Text>
                Some web browsers offer a "Do Not Track" ("DNT") signal. Because
                there is no common understanding of how to interpret DNT
                signals, the App does not currently respond to DNT signals.
              </Text>
            </Box>
          </Stack>
        </Box>
        <Box>
          <Title order={2} size="h3" mb="md">
            5. Data Security
          </Title>
          <Text>
            We take reasonable measures to protect your information from
            unauthorized access, use, or disclosure. However, no method of
            transmission over the internet or electronic storage is 100% secure,
            and we cannot guarantee absolute security.
          </Text>
        </Box>

        {/* Children's Privacy */}
        <Box>
          <Title order={2} size="h3" mb="md">
            6. Children's Privacy
          </Title>
          <Text>
            The App is not intended for children under the age of 13. We do not
            knowingly collect personal information from children under the age
            of 13. If you are a parent or guardian and believe that your child
            has provided us with personal information, please contact us
            immediately so that we can take appropriate action.
          </Text>
        </Box>

        {/* Changes to Privacy Policy */}
        <Box>
          <Title order={2} size="h3" mb="md">
            7. Changes to This Privacy Policy
          </Title>
          <Text>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </Text>
        </Box>

        {/* Contact Information */}
        <Box>
          <Title order={2} size="h3" mb="md">
            8. Contact Us
          </Title>
          <Text>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at support@needful.site.
          </Text>
        </Box>
      </Stack>
    </Container>
  );
}
