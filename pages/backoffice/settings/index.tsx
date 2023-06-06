import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";

import { Location } from "../../../types/Types";
import { AppContext } from "../../../contexts/AppContext";

const Settings = () => {
  const { locations, fetchData } = useContext(AppContext);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");

  useEffect(() => {
    if (locations.length) {
      const locationIdFromLocalStorage =
        localStorage.getItem("selectedLocationId");
      if (locationIdFromLocalStorage) {
        setSelectedLocationId(locationIdFromLocalStorage);
      } else {
        const firstLocationId = String(locations[0].id);
        setSelectedLocationId(firstLocationId);
      }
    }
  }, [locations]);

  const handleChange = (event: SelectChangeEvent) => {
    const locationId = event.target.value;
    setSelectedLocationId(locationId);
    localStorage.setItem("selectedLocationId", event.target.value);
  };
  return (
    <Box sx={{ p: 3 }}>
      {/* <TextField defaultValue={company?.name} /> */}
      <Box sx={{ mt: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Locations</InputLabel>
          <Select
            value={selectedLocationId}
            label="Locations"
            onChange={handleChange}>
            {locations.map((location: Location) => {
              return (
                <MenuItem value={location.id} key={location.id}>
                  {location.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Settings;
