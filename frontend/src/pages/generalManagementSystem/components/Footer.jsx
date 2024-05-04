import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CallEndIcon from '@mui/icons-material/CallEnd';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={5} lg={4}>
        We are Here! 24/7 Customer Support
        <h2>077 1234567 / 077 1234567</h2>
        <CallEndIcon/><br></br>
        No.177/A
                <br />
                Gall Road,
                <br />
                Katubedda.

        </Grid>
        <Grid container xs={12} md={7} lg={8} spacing={4}>
          <Grid xs={6} lg={3}>
            
              <Box
                id="category-a"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Main Branch
              </Box>
              <Box component="p" aria-labelledby="category-a" sx={{ pl: 2 }}>
                No.177/A
                <br />
                Gall Road,
                <br />
                Katubedda.
              </Box>
           
          </Grid>
          <Grid xs={6} lg={3}>
           
              <Box 
                id="category-b"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Phone
              </Box>
              <Box component="p" aria-labelledby="category-b" sx={{ pl: 2 }}>
                077 1234567
                <br />
                077 1234567
                <br />
                071 1234567
              </Box>
            
          </Grid>
          <Grid xs={6} lg={3}>
           
              <Box
                id="category-c"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Category C
              </Box>
              <Box component="p" aria-labelledby="category-c" sx={{ pl: 2 }}>
                Paragraph 1
                <br />
                Paragraph 2
                <br />
                Paragraph 3
              </Box>
            
          </Grid>
          <Grid xs={6} lg={3}>
            
              <Box
                id="category-d"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Category D
              </Box>
              <Box component="p" aria-labelledby="category-d" sx={{ pl: 2 }}>
                Paragraph 1
                <br />
                Paragraph 2
                <br />
                Paragraph 3
              </Box>
            
          </Grid>
        </Grid>
        <Grid
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
          sx={{ fontSize: '12px' }}
        >
          <Grid sx={{ order: { xs: 2, sm: 1 } }}>
            <ul><h6>© Follow Us</h6></ul>
          </Grid>
          <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
            <Grid>
              <ul><FacebookIcon/></ul>
            </Grid>
            <Grid>
              <ul><InstagramIcon/></ul>
            </Grid>
            <Grid>
              <ul><YouTubeIcon/></ul>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
