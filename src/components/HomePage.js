import React from "react";
import { Paper, Typography } from "@mui/material";
function HomePage() {
  <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
    <Typography variant="h4" component="h2" gutterBottom color="primary">
      Welcome to the Home Page!
    </Typography>
    <Typography variant="body1" paragraph>
      This is the placeholder content for your Home page. You can add
      your main information, featured products, or a welcoming message here.
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Feel free to customize this section with your actual content.
    </Typography>
  </Paper>
}

export default HomePage;