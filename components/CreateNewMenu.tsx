import { Box, Button, TextField } from "@mui/material";
import FileDropZone from "./FileDropZone";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useCreateMenu } from "../hooks/useCreateMenu";
import { supabase } from "@/libs/supabase";
import { useSession } from "next-auth/react";

const CreateNewMenu = () => {
  const { fetchData, locations, companyId } = useContext(AppContext);
  const { data: session } = useSession();
  //@ts-ignore
  const token = session?.accessToken;
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: 0,
    asset_url: "",
    companyId: companyId,
  });
  newMenu.companyId = companyId;
  const [locationId, setLocationId] = useState<number>();

  const getLocationId = async (companyId: any) => {
    const resp = await fetch(`/api/locations?id=${companyId}`);
    const data = await resp.json();
    setLocationId(data.locationId);
  };

  const { createNewMenu } = useCreateMenu();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const createMenu = async () => {
    const { data: asset_url } = await supabase.storage
      .from("menus_asset_url")

      .upload(
        //@ts-ignore
        selectedFiles[0].path as string,
        selectedFiles[0]
      );
    console.log(asset_url);
    const { data: imageUrl } = supabase.storage
      .from("menus_asset_url")
      //@ts-ignore
      .getPublicUrl(selectedFiles[0].path);
    console.log(imageUrl);
    newMenu.asset_url = imageUrl.publicUrl;

    // console.log(newMenu);
    //@ts-ignore
    await createNewMenu(newMenu);

    fetchData();

    // const formData = new FormData();
    // formData.append("files", selectedFiles[0]);
    // const resp = await fetch(`${config.apiBaseUrl}/assets`, {
    //   method: "POST",

    //   body: formData,
    // });
    // const data = await resp.json();
    // newMenu.asset_url = data.assetUrl;
    // if (resp.ok) {
    //   const response = await fetch(`${config.apiBaseUrl}/api/menus`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //     body: JSON.stringify(newMenu),
    //   });
    //   if (response.ok) {
    //     fetchData();
    //   }
    // }
  };

  const onFileSelected = (selectedFiles: File[]) => {
    setSelectedFiles(selectedFiles);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={(evt) => {
          setNewMenu({ ...newMenu, name: evt.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        onChange={(evt) => {
          setNewMenu({ ...newMenu, description: evt.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Price"
        variant="outlined"
        onChange={(evt) => {
          setNewMenu({ ...newMenu, price: Number(evt.target.value) });
        }}
      />
      <FileDropZone onFileSelected={onFileSelected} />
      <Button onClick={createMenu}>Create</Button>
    </Box>
  );
};

export default CreateNewMenu;
