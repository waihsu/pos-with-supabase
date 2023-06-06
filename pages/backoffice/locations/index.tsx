import { useContext, useRef, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useLocation } from "../../../hooks/useLocations";
import { ThemeContext } from "../../..//contexts/ThemeContext";
import CreateNewLocation from "../../../components/CreateNewLocationDrawer";
import { motion, Variants } from "framer-motion";

const variant: Variants = {
  offscreen: {
    opacity: 0,
    x: -100,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      bounce: 0.2,
      duration: 0.4,
      delay: 0.4,
    },
  },
};

const Locations = () => {
  const ref = useRef(null);
  const { locations, fetchData, companyId } = useContext(AppContext);
  const { isSmallscreen, isMediumScreen } = useContext(ThemeContext);

  const [updateData, setUpdateData] = useState({
    name: "",
    address: "",
    locationId: "",
  });

  const { createNewLocation, deletelocation, updateLocation } = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
      <CreateNewLocation />
      <Box sx={{ width: "100%", px: 3 }}>
        {locations.map((location, index) => {
          return (
            <motion.div
              key={location.id}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ root: ref }}>
              <motion.div variants={variant}>
                <Box
                  sx={{
                    mb: 2,
                    gap: 2,
                    display: "flex",
                    flexDirection: "column",
                    mx: "auto",
                  }}>
                  <Typography variant="h5">{index + 1}.</Typography>
                  <TextField
                    defaultValue={location.name}
                    fullWidth
                    onChange={(evt) => {
                      setUpdateData({
                        ...updateData,
                        name: evt.target.value,
                      });
                    }}
                  />
                  <TextField
                    defaultValue={location.address}
                    fullWidth
                    onChange={(evt) => {
                      setUpdateData({
                        ...updateData,
                        address: evt.target.value,
                      });
                    }}
                  />
                  <Box>
                    <Button
                      variant="contained"
                      onClick={() =>
                        updateLocation({
                          ...updateData,
                          locationId: location.id as number,
                        })
                      }>
                      Update
                    </Button>
                    <Button
                      sx={{ bgcolor: "red" }}
                      onClick={() => deletelocation(location.id as number)}>
                      Delete
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default Locations;
