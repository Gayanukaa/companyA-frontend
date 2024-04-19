import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Warning } from "@mui/icons-material";

export default function NotFound() {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <Box textAlign="center">
                <Warning sx={{ fontSize: "6rem", mb: 4 }} />
                <Typography variant="h4" component="h1" mb={4}>
                    404 - Page Not Found
                </Typography>
                <Typography variant="body1">
                    Oops! Looks like you've stumbled onto a page that doesn't
                    exist.
                </Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="error"
                    mt={4}
                >
                    Go back home
                </Button>
            </Box>
        </Box>
    );
}
