import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const CardComp = ({ data }) => {
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={6} xl={6}>
          {" "}
          {/* Adjust the grid size according to your layout */}
          <Box boxShadow={3}>
            <Card variant="outlined" style={{ width: "100%", height: "200px" }}>
              {" "}
              {/* Adjust the card width here */}
              <CardContent>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: "90px" }}>
                    <img
                      src={item.image}
                      alt={item.altText}
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "30px",
                      }}
                    />
                  </div>
                  <div>
                    <Typography variant="h5" component="div">
                      {item.count}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      marginTop="50px"
                      fontSize="20px"
                    >
                      {item.name}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardComp;
