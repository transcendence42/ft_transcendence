import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

const Layout = () => {
  return (
    <>
      <Grid h="1024" templateColumns="repeat(288, 1fr)">
        <GridItem w="85" colSpan={17} bg="papayawhip" />
        <GridItem colSpan={193} bg="tomato" />
        <GridItem colSpan={78} bg="papayawhip" />
      </Grid>
    </>
  );
};

export default Layout;
