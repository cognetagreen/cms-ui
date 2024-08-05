import React from "react";
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";

interface NavItemProps {
  icon?: React.ElementType;
  children: React.ReactNode;
  showLabel: boolean;
  [x: string]: any;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  children,
  showLabel,
  ...rest
}) => {
  const color = useColorModeValue("white", "gray.300");
  return (
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      color="inherit"
      _dark={{ color: "#FFFFFF" }}
      _hover={{
        width: "max-width",
        bg: "rgba(25, 202, 22, 0.2)",
        _dark: { bg: "rgba(25, 202, 22, 0.2)" },
        color: "#FFFFFF",
        fontWeight: 600,
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      {...rest}
    >
      {icon && (
        <Icon
          mx="10"
          boxSize="14px"
          _groupHover={{ color: color }}
          as={icon}
        />
      )}
      {showLabel && children}
    </Flex>
  );
};

export default NavItem;
