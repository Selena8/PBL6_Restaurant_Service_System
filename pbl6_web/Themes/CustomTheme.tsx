import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
  interface PaletteOptions {
    cancel?: string;
  }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#FE724C',
        },
        secondary: {
            main: '#0F172B',
        },
        info: {
            main: '#D9D9D9'
        }
    },
});

export default theme;