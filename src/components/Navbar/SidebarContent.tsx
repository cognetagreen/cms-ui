// src/components/Sidebar.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Icon,
  Collapse,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiSliderVertical } from "react-icons/ci";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { Home, AlertTicket, Analysis, Site, Tools, Alarm } from "../../assets/Navbar/SideNavBar";
import { Select } from "chakra-react-select";
import { useCustomerOptionsContext } from "../../Context/CustomerOptionsContext";
import { useSelectedCustomerIDContext } from "../../Context/SelectedCustomerIDContext";

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

  //****************Handle Select Customer */
  const { customerOptions } = useCustomerOptionsContext();
  const {selectedCustomerID, setSelectedCustomerID} = useSelectedCustomerIDContext();

  const handlePlantChange = (selectedOption: any) => {
    setSelectedCustomerID(selectedOption?.value);
    localStorage.setItem("SelectedCustomerId", selectedOption?.value || "");
    // window.location.reload();
  };
  // console.log(customerOptions)
  // console.log(selectedCustomerID)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  useEffect(() => {
    if (customerOptions) {
      // console.log(customerOptions)
      setSelectedCustomerId(selectedCustomerID);
      localStorage.setItem("SelectedCustomerId", selectedCustomerID || "")
    } 
  }, []);

  const portfolio = useDisclosure();
  const sites = useDisclosure();
  const Assets = useDisclosure();
  const tools = useDisclosure();
  const showLabels = isSidebarExpanded;

  return (
    <Box
      as="nav"
      pos="fixed"
      top="10"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRightWidth="1px"
      w={showLabels ? "300px" : "60px"}
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
          onClick={portfolio.onToggle}
          fontSize={"md"}
          fontWeight={600}
          showLabel={showLabels}
          color={portfolio.isOpen ? "#19CA16" : "white"}
        >
          &nbsp; Portfolio
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={portfolio.isOpen ? "rotate(90deg)" : undefined}
          />
        </NavItem>
        <Collapse in={portfolio.isOpen}>
          <NavItem
            pl="12"
            py="2"
            showLabel={showLabels}
            color={"#FFFFFFFF"}
            fontWeight={600}
            as={Link}
            to="/portfolio"
          >
            Dashboard
          </NavItem>
          <NavItem
            pl="12"
            py="2"
            showLabel={showLabels}
            color={portfolio.isOpen ? "#19CA16" : "#FFFFFFFF"}
            fontWeight={500}
            as={Link}
            to="/alarm"
          >
            Alterts
          </NavItem>
        </Collapse>
        <NavItem
          icon={Site}
          fontSize={"md"}
          color={"#FFFFFFFF"}
          fontWeight={600}
          showLabel={showLabels}
          onClick={sites.onToggle}
          >
          &nbsp; Sites
          <Icon
              as={MdKeyboardArrowRight}
              transform={sites.isOpen ? "rotate(90deg)" : undefined}
              ml="auto"
            />
        </NavItem>
        <Collapse in={sites.isOpen}>
        <FormControl
            ml={showLabels? 5 : 60}
            px={5}
            width={300}
            h={14}
            borderLeft={"1px solid #D1D8DD"}
          >
            <FormLabel
              fontFamily={"inter"}
              fontSize={10}
              fontWeight={10}
              color={"#747474"}
              mt={2}
            >
              Select Plant
            </FormLabel>
            <Box mt={-3} fontWeight={600}>
              <Select
                isMulti={false}
                maxMenuHeight={200}
                name="plants"
                placeholder="Select Any Plant"
                closeMenuOnSelect={true}
                variant="unstyle"
                focusBorderColor="transparent"
                options={customerOptions || []}
                value={customerOptions?.find(option => option.value === localStorage.getItem("SelectedCustomerId"))}
                onChange={handlePlantChange}
                useBasicStyles={true}
              />
            </Box>
          </FormControl>
          <NavItem
            showLabel={showLabels}
            color={"#FFFFFFFF"}
            fontSize={"md"}
            fontWeight={600}
          >
            &nbsp; Dashboard
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={"rotate(90deg)"}
            />
          </NavItem>
          <NavItem
            onClick={Assets.onToggle}
            showLabel={showLabels}
            color={"#FFFFFFFF"}
            fontSize={"md"}
            fontWeight={600}
            as={Link}
            to={'/inverter'}
          >
            &nbsp; Assets
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={Assets.isOpen ? "rotate(90deg)" : undefined}
            />
          </NavItem>
          <Collapse in={Assets.isOpen}>
              <NavItem pl="12" py="2" color={"#FFFFFFFF"} showLabel={showLabels} as={Link} to={'/plantview'}>
              Overview
              </NavItem>
              <NavItem pl="12" py="2" color={"#FFFFFFFF"} showLabel={showLabels} as={Link} to={'/inverter'}>
                Inverter
              </NavItem>
              <NavItem pl="12" py="2" color={"#FFFFFFFF"} showLabel={showLabels}>
                String
              </NavItem>
              <NavItem pl="12" py="2" color={"#FFFFFFFF"} showLabel={showLabels} as={Link} to={'/grid'}>
                Grid
              </NavItem>
              <NavItem pl="12" py="2" color={"#FFFFFFFF"} showLabel={showLabels} as={Link} to={'/bess/overview'}>
                BESS
              </NavItem>
              <NavItem pl="12" py="2" color={"#FFFFFFFF"} showLabel={showLabels} as={Link} to={'/dg'}>
                Diesel Generator
              </NavItem>
          </Collapse>
        </Collapse>
        <NavItem
          icon={Tools}
          fontSize={"md"}
          color={"#FFFFFFFF"}
          fontWeight={600}
          onClick={tools.onToggle}
          showLabel={showLabels}
          as={Link}
          to={'/dg'}
        >
          &nbsp; Tools
          <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={tools.isOpen? "rotate(90deg)" : undefined}
            />
        </NavItem>
        <Collapse in={tools.isOpen}>
          <NavItem
            fontSize={"md"}
            color={"#FFFFFFFF"}
            fontWeight={600}
            showLabel={showLabels}
            pl={12}
            as={Link}
            to={'/dg'}
          >
          Reports
          </NavItem>
          <NavItem
            showLabel={showLabels}
            pl={12}
            color={"#FFFFFFFF"}
            fontSize={"md"}
            fontWeight={600}
            as={Link}
            to={'/bess/overview'}
            >
            Analytics
          </NavItem>
          <NavItem
            showLabel={showLabels}
            pl={12}
            color={"#FFFFFFFF"}
            fontSize={"md"}
            fontWeight={600}
            as={Link}
            to={'/alarm'}
          >
          Intel-IQ
          </NavItem>
        </Collapse>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
