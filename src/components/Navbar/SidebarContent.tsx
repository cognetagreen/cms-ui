// src/components/Sidebar.tsx
import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Icon,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiSliderVertical } from "react-icons/ci";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { Home, AlertTicket, Analysis, Site, Tools } from "../../assets/Navbar/SideNavBar";

interface SidebarContentProps {
  isSidebarExpanded: boolean;
  onToggleSidebar: () => void;
  [x: string]: any;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  isSidebarExpanded,
  onToggleSidebar,
  ...props
}) => {
  const home = useDisclosure();
  const sites = useDisclosure();
  const integrations = useDisclosure();
  const showLabels = isSidebarExpanded;

  return (
    <Box
      as="nav"
      pos="fixed"
      top="14"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRightWidth="1px"
      w={showLabels ? "200px" : "60px"}
      transition="width 0.3s"
      {...props}
    >
      <Flex
        direction="column"
        as="nav"
        mt={2}
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <IconButton
          mt={5}
          aria-label="Menu"
          color={"#FFFFFFFF"}
          bg={"transparent"}
          icon={isSidebarExpanded ? <CiSliderVertical /> : <FiMenu />}
          display={{ base: "inline-flex", md: "inline-flex" }}
          _hover={{ bg: "transparent" }}
          cursor={"pointer"}
          alignSelf={isSidebarExpanded ? "end" : "center"}
          onClick={onToggleSidebar}
          mb={8}
        />
        <NavItem
          icon={Home}
          onClick={home.onToggle}
          fontSize={"md"}
          fontWeight={600}
          showLabel={showLabels}
          color={home.isOpen ? "#19CA16" : "white"}
        >
          &nbsp; Home
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={home.isOpen ? "rotate(90deg)" : undefined}
          />
        </NavItem>
        <Collapse in={home.isOpen}>
          <NavItem
            pl="12"
            py="2"
            showLabel={showLabels}
            color={"#FFFFFFFF"}
            fontWeight={600}
            as={Link}
            to="/"
          >
            Portfolio
          </NavItem>
          <NavItem
            pl="12"
            py="2"
            onClick={sites.onToggle}
            showLabel={showLabels}
            color={home.isOpen ? "#19CA16" : "#FFFFFFFF"}
            fontWeight={500}
          >
            Sites
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={sites.isOpen ? "rotate(90deg)" : undefined}
            />
          </NavItem>
          <Collapse in={sites.isOpen}>
            <NavItem
              pl="12"
              py="2"
              showLabel={showLabels}
              color={"#FFFFFFFF"}
              fontWeight={500}
              as={Link}
              to="/grid"
            >
              &nbsp; BESS
            </NavItem>
            <NavItem
              pl="12"
              py="2"
              showLabel={showLabels}
              color={"#FFFFFFFF"}
              fontWeight={500}
              as={Link}
              to="/grid"
            >
              &nbsp; Grid
            </NavItem>
          </Collapse>
        </Collapse>
        <NavItem
          icon={AlertTicket}
          fontSize={"md"}
          color={"#FFFFFFFF"}
          fontWeight={600}
          showLabel={showLabels}
          as={Link}
          to={'/plantview'}
        >
          &nbsp; Plant view
        </NavItem>
        <NavItem
          icon={Analysis}
          fontSize={"md"}
          color={"#FFFFFFFF"}
          fontWeight={600}
          showLabel={showLabels}
        >
          &nbsp; Collections
        </NavItem>
        <NavItem
          icon={Site}
          showLabel={showLabels}
          color={"#FFFFFFFF"}
          fontSize={"md"}
          fontWeight={600}
        >
          &nbsp; Checklists
        </NavItem>
        <NavItem
          icon={Tools}
          onClick={integrations.onToggle}
          showLabel={showLabels}
          color={"#FFFFFFFF"}
          fontSize={"md"}
          fontWeight={600}
        >
          &nbsp; Integrations
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen ? "rotate(90deg)" : undefined}
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem pl="12" py="2" color={"#FFFFFFFF"} showLabel={showLabels}>
            Shopify
          </NavItem>
          <NavItem pl="12" py="2" color={"#FFFFFFFF"} showLabel={showLabels}>
            Slack
          </NavItem>
          <NavItem pl="12" py="2" color={"#FFFFFFFF"} showLabel={showLabels}>
            Zapier
          </NavItem>
        </Collapse>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
