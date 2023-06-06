import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { Box } from "@mui/material";
import MenuCard from "../../../components/MenuCard";
import { motion, Variants } from "framer-motion";
import CreateNewMenu from "../../../components/CreateNewMenu";
import { supabase } from "@/libs/supabase";
import { Menu } from "@/types/Types";
import { config } from "@/config/config";
import { getServerSession } from "next-auth";

const menuCardVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 500,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      bounce: 0.1,
      duration: 0.8,
      delay: 0.1,
    },
  },
};

const Menus = () => {
  const { menus, fetchData } = useContext(AppContext);
  const ref = useRef(null);

  // useEffect(() => {
  //   fetchData()
  // },[])

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          px: 2,
        }}>
        <CreateNewMenu />
        {menus &&
          menus.map((menu) => (
            <motion.div
              key={menu.id}
              initial="offscreen"
              animate="onscreen"
              viewport={{ root: ref }}>
              <motion.div variants={menuCardVariants}>
                <Box>
                  <MenuCard
                    id={menu.id as number}
                    name={menu.name}
                    asset_url={menu.asset_url as string}
                    description={menu.description as string}
                    price={menu.price}
                  />
                </Box>
              </motion.div>
            </motion.div>
          ))}
      </Box>
    </Box>
  );
};

export default Menus;
