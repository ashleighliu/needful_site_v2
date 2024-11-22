import { Button, Flex, Grid, Group, Image, Menu, Text } from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons-react";
import NeedfulLogo from "../../assets/NeedfulLogo.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  setIsLoggedIn,
  setUserInfo,
} from "../../store/slices/userSlice";
import { getAuth, signOut } from "firebase/auth";

export function Navbar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setIsLoggedIn(false));
      dispatch(setUserInfo(null));
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Grid align="center">
      <Grid.Col span={6}>
        <Group>
          <Image
            m={20}
            h={50}
            w="auto"
            src={NeedfulLogo}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <Text
            c="#555555"
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          >
            Home
          </Text>
          <Text
            c="#555555"
            onClick={() => navigate("/about")}
            style={{ cursor: "pointer" }}
          >
            About
          </Text>
          <Text
            c="#555555"
            onClick={() => navigate("/contact")}
            style={{ cursor: "pointer" }}
          >
            Contact
          </Text>
        </Group>
      </Grid.Col>
      <Grid.Col span={6}>
        {isLoggedIn ? (
          <Flex gap="md" justify="flex-end" m={20}>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle" leftSection={<IconUser size={14} />}>
                  My Account
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconUser size={14} />}
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout size={14} />}
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        ) : (
          <Flex gap="md" justify="flex-end" m={20}>
            <Button
              h={45}
              radius="md"
              variant="outline"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              h={45}
              w={200}
              radius="md"
              onClick={() => navigate("/signup")}
            >
              Try Needful for Free
            </Button>
          </Flex>
        )}
      </Grid.Col>
    </Grid>
  );
}
