import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea } from "@mui/material";
import { useCreateMenu } from "@/hooks/useCreateMenu";
import Link from "next/link";

interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  asset_url: string;
}

const MenuCard = ({ name, description, price, asset_url, id }: Menu) => {
  const { deleteMenu } = useCreateMenu();

  return (
    <Box>
      <Link href={`/backoffice/menu-categories?id=${id}`}>
        <Card sx={{ width: "100%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={asset_url}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {price}
              </Typography>
            </CardContent>
            <Button onClick={() => deleteMenu(id, asset_url)}>Delete</Button>
          </CardActionArea>
        </Card>
      </Link>
    </Box>
  );
};

export default MenuCard;
