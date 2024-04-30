import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import classes from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            This is my title <br />
          </Title>
          <Text c="dimmed" mt="md">
            bla bla bla
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>asjuhajsdhad</b> – lasidjas jas lidjaldja lsdijas dlja sldas
            </List.Item>
            <List.Item>
              <b>ksaih ask hak</b> isah dkas kahkd ashk ahd a
            </List.Item>
            <List.Item>
              <b>ksuhak dh </b> ksahk ahk jahdahkjdhakjdhakd
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Get started
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              component={Link}
              href="https://sepolia.etherscan.io/address/0xD56b722262Ae87610B1E8E306351407e962b9037#code"
              rel="noopener noreferrer"
              target="_blank"
            >
              Solidity code
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
