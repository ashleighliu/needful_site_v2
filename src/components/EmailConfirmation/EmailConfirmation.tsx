import { Text, Button, Center, Box, PinInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { VerifyEmail } from "../VerifyEmail/VerifyEmail";
type EmailConfirmationProps = {
  next: () => void;
};

export function EmailConfirmation(props: EmailConfirmationProps) {
  const { next } = props;
  const navigate = useNavigate();

  return (
    <form onSubmit={() => {}}>
      <VerifyEmail signup />
    </form>
  );
}
