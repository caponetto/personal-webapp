import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import React from "react";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";

export function AboutPage() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Fade in={true} timeout={100}>
          <Grid item xs={12}>
            <Paper sx={{ height: "200px" }} elevation={2}>
              TODO
            </Paper>
          </Grid>
        </Fade>
        <Fade in={true} timeout={500}>
          <Grid item xs={12} lg={6}>
            <Paper sx={{ height: "200px" }} elevation={2}>
              TODO
            </Paper>
          </Grid>
        </Fade>
        <Fade in={true} timeout={1000}>
          <Grid item xs={12} lg={6}>
            <Paper sx={{ height: "200px" }} elevation={2}>
              TODO
            </Paper>
          </Grid>
        </Fade>
        <Fade in={true} timeout={1500}>
          <Grid item xs={12}>
            <Paper sx={{ height: "200px" }} elevation={2}>
              TODO: cloud of words
            </Paper>
          </Grid>
        </Fade>
      </Grid>
    </Box>
  );
}
