import { styled } from '@mui/material/styles';
import { Grid, Box } from '@mui/material';
import { Icon } from '@iconify/react';

const FooterComponent = styled('div')(({ theme }) => ({
  backgroundColor: '#1a202c',
  color: '#fff',
  paddingTop: theme.spacing(5),
  marginTop: theme.spacing(5),
  visibility: 'visible',
}));

const SectionTitle = styled('h3')(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '1.5rem',
  color: '#FE724C',
  fontWeight: '600',
  position: 'relative',
  marginBottom: theme.spacing(4)
}));

const Link = styled('a')(({ theme }) => ({
  display: 'flex',
  color: '#fff',
  textDecoration: 'none',
  marginBottom: theme.spacing(2),
  '&:hover': {
    letterSpacing: '1px',
  },
}));

const IconWrapper = styled('span')(({ theme }) => ({
  marginRight: theme.spacing(3),
  fontSize: '1.2rem',
}));

const SocialIconWrapper = styled('span')(({ theme }) => ({
  marginRight: theme.spacing(2),
  fontSize: '1.5rem',
}));

const OpeningHours = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginBottom: theme.spacing(4),
}));

const FooterMenu = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  '& a': {
    color: '#fff',
    textDecoration: 'none',
    marginTop: theme.spacing(1),
    '&:hover': {
      color: '#FE724C'
    }
  },
}));

const CompanyWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
  },
  '& a': {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: theme.spacing(0.5),
  },
}));

const Footer = () => {
  return (
    <FooterComponent>
        <Box sx={{width: '80%',  margin: '0 auto',}}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <SectionTitle>Company</SectionTitle>
              <CompanyWrapper>
                <Link href="#">
                  <SocialIconWrapper>
                    <Icon icon="ooui:next-ltr" />
                  </SocialIconWrapper>
                  About Us
                </Link>
                <Link href="#">
                  <SocialIconWrapper>
                    <Icon icon="ooui:next-ltr" />
                  </SocialIconWrapper>
                  Contact Us
                </Link>
                <Link href="#">
                  <SocialIconWrapper>
                    <Icon icon="ooui:next-ltr" />
                  </SocialIconWrapper>
                  Reservation
                </Link>
                <Link href="#">
                  <SocialIconWrapper>
                    <Icon icon="ooui:next-ltr" />
                  </SocialIconWrapper>
                  Privacy Policy
                </Link>
              </CompanyWrapper>
            </Grid>
            <Grid item xs={12} md={4}>
              <SectionTitle>Contact Us</SectionTitle>
              <Link href="#">
                <IconWrapper>
                  <Icon icon="mdi:location" fontSize="30px"/>
                </IconWrapper>
                123 Main St, New York, NY 10001
              </Link>
              <Link href="#">
                <IconWrapper>
                  <Icon icon="ic:round-phone" fontSize="30px"/>
                </IconWrapper>
                (123) 456-7890
              </Link>
              <Link href="#">
                <IconWrapper>
                  <Icon icon="ic:round-email" fontSize="30px"/>
                </IconWrapper>
                info@example.com
              </Link>
              <FooterMenu>
                <Link href="#">
                  <SocialIconWrapper>
                    <Icon icon="mdi:twitter" fontSize="30px"/>
                  </SocialIconWrapper>
                </Link>
                <Link href="#">
                  <SocialIconWrapper>
                    <Icon icon="ri:facebook-fill" fontSize="30px"/>
                  </SocialIconWrapper>
                </Link>
                <Link href="#">
                  <SocialIconWrapper>
                    <Icon icon="mdi:youtube" fontSize="30px"/>
                  </SocialIconWrapper>
                </Link>
                <Link href="#">
                  <SocialIconWrapper>
                    <Icon icon="ri:linkedin-fill" fontSize="30px"/>
                  </SocialIconWrapper>
                </Link>
              </FooterMenu>
            </Grid>
            <Grid item xs={12} md={4}>
              <SectionTitle>Opening Hours</SectionTitle>
              <OpeningHours>
                <Box>
                  <span style={{fontSize: '20px'}}>Monday - Saturday:</span> 
                  <br />
                  09am - 09pm
                </Box>
                <Box>
                  <span style={{fontSize: '20px'}}>Sunday:</span> 
                  <br />
                  10am - 08pm
                </Box>
              </OpeningHours>
            </Grid>
          </Grid>
        </Box>
    </FooterComponent>
  );
}

export default Footer