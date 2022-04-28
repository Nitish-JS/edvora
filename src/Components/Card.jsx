import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ImgMediaCard(props) {
  return (
    <Card
      sx={{
        maxWidth: "90%",
        display: "flex",
        mx: "auto",
        p: 5,
        my: 5,
        background: "#101010",
        color: "#CFCFCF",
      }}
    >
      <CardMedia
        component="img"
        alt="react"
        height="148"
        image={props.map}
        sx={{ maxWidth: "296px" }}
      />
      <CardContent sx={{width:"100%"}}>
        <Button variant="contained"  sx={{float:"right",background:"rgba(0, 0, 0, 0.56)",borderRadius:"16px",marginLeft:"16px"}}>{props.state}</Button>
        <Button variant="contained" sx={{float:"right",background:"rgba(0, 0, 0, 0.56)",borderRadius:"16px"}}>{props.city}</Button>
        <Typography variant="body2" gutterBottom>
          Ride id: {props.id}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Origin Station: {props.origin}
        </Typography>
        <Typography variant="body2" gutterBottom>
          station_path: {JSON.stringify(props.path)}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Date: {props.date}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Distance: {props.distance}
        </Typography>
      </CardContent>
    </Card>
  );
}
