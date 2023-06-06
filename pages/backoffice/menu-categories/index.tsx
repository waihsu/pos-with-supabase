import { AppContext } from "@/contexts/AppContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useMenuCategories } from "@/hooks/useMenuCategories";

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

const MenuCategories = () => {
  const { menuCategories } = useContext(AppContext);
  const { updateMenuCategories } = useMenuCategories();

  const [updateData, setUpdateData] = useState({ id: Number, name: "" });
  const ref = useRef(null);
  return (
    <Box>
      <Box sx={{ width: "100%", px: 3 }}>
        {menuCategories.map((menuCategorie) => {
          return (
            <motion.div
              key={menuCategorie.id}
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
                  <TextField
                    defaultValue={menuCategorie.name}
                    fullWidth
                    onChange={(evt) => {
                      setUpdateData({ ...updateData, name: evt.target.value });
                    }}
                  />

                  <Box>
                    <Button
                      variant="contained"
                      onClick={() =>
                        updateMenuCategories({
                          ...updateData,
                          id: menuCategorie.id as number,
                        })
                      }>
                      Update
                    </Button>
                    <Button sx={{ bgcolor: "red" }}>Delete</Button>
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

export default MenuCategories;
