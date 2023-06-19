import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import ArrowRight from '@mui/icons-material/ArrowRight';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from "@mui/icons-material/Home";
// import Settings from '@mui/icons-material/Settings';
// import People from '@mui/icons-material/People';
// import PermMedia from '@mui/icons-material/PermMedia';
// import Dns from '@mui/icons-material/Dns';
// import Public from '@mui/icons-material/Public';

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export default function CustomizedList() {
  return (
    <Box sx={{ display: "flex", height: "90vh" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" }, //cor do botão início
            background: { paper: "rgb(5, 30, 52)" }, //cor de fundo do menu inteiro
          },
        })}
      >
        <Paper elevation={0} sx={{ width: "100%", height: "100%" }}>
          <FireNav component="nav" disablePadding>
            {/*<ListItemButton component="a" href="#customized-list">
              <ListItemIcon sx={{ fontSize: 25 }}>📚</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Biblioteca"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
              <Divider />*/}
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemIcon>
                  <Home color="primary" />
                </ListItemIcon>
                <a href="/">
                  <ListItemText
                    primary="Início"
                    primaryTypographyProps={{
                      color: "primary",
                      fontWeight: "medium",
                      variant: "body2",
                    }}
                  />
                </a>
              </ListItemButton>
            </ListItem>
            <Divider />
            <Box
              sx={{
                bgcolor: window.open ? "rgba(71, 98, 130, 0.2)" : null, //cor do box de opções do menu
                pb: window.open ? 2 : 0,
              }}
            >
              <a href="/listagem-usuarios">
                <ListItemButton
                  alignItems="flex-start"
                  sx={{
                    px: 3,
                    pt: 2.5,
                    //pb: open ? 0 : 2.5,
                    //'&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                  }}
                >
                  <ListItemText
                    primary="Usuários"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                  />
                </ListItemButton>
              </a>
              <a href="/listagem-funcionarios">
                <ListItemButton
                  alignItems="flex-start"
                  sx={{
                    px: 3,
                    pt: 2.5,
                    //pb: open ? 0 : 2.5,
                    //'&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                  }}
                >
                  <ListItemText
                    primary="Funcionários"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                  />
                </ListItemButton>
              </a>
              <a href="/listagem-leitores">
                <ListItemButton
                  alignItems="flex-start"
                  sx={{
                    px: 3,
                    pt: 2.5,
                  }}
                >
                  <ListItemText
                    primary="Leitores"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    sx={{ my: 0 }}
                  />
                </ListItemButton>
              </a>
              <a href="/listagem-titulos">
                <ListItemButton
                  alignItems="flex-start"
                  sx={{
                    px: 3,
                    pt: 2.5,
                  }}
                >
                  <ListItemText
                    primary="Títulos"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    sx={{ my: 0 }}
                  />
                </ListItemButton>
              </a>
              <a href="/listagem-exemplares">
                <ListItemButton
                  alignItems="flex-start"
                  sx={{
                    px: 3,
                    pt: 2.5,
                  }}
                >
                  <ListItemText
                    primary="Exemplares"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    sx={{ my: 0 }}
                  />
                </ListItemButton>
              </a>
              <a href="/cadastro-emprestimo">
                <ListItemButton
                  alignItems="flex-start"
                  sx={{
                    px: 3,
                    pt: 2.5,
                  }}
                >
                  <ListItemText
                    primary="Empréstimos"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    sx={{ my: 0 }}
                  />
                </ListItemButton>
              </a>
              <a href="/cadastro-devolucao">
                <ListItemButton
                  alignItems="flex-start"
                  sx={{
                    px: 3,
                    pt: 2.5,
                  }}
                >
                  <ListItemText
                    primary="Devoluções"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    sx={{ my: 0 }}
                  />
                </ListItemButton>
              </a>
              <a href="/listagem-documentos">
                <ListItemButton
                  alignItems="flex-start"
                  sx={{
                    px: 3,
                    pt: 2.5,
                  }}
                >
                  <ListItemText
                    primary="Configurar Documentos"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    sx={{ my: 0 }}
                  />
                </ListItemButton>
              </a>
              {/* <a href="/reserva">
                <ListItemButton
                  alignItems="flex-start"
                  sx={{
                    px: 3,
                    pt: 2.5,
                  }}
                >
                  <ListItemText
                    primary="Reserva"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    sx={{ my: 0 }}
                  />
                </ListItemButton>
              </a> */}
              <a href="/renovar">
                <ListItemButton
                  alignItems="flex-start"
                  sx={{
                    px: 3,
                    pt: 2.5,
                  }}
                >
                  <ListItemText
                    primary="Renovar"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    sx={{ my: 0 }}
                  />
                </ListItemButton>
              </a>
              <a href="/consulta-leitor">
                <ListItemButton
                  alignItems="flex-start"
                  sx={{
                    px: 3,
                    pt: 2.5,
                  }}
                >
                  <ListItemText
                    primary="Consulta Leitor"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    sx={{ my: 0 }}
                  />
                </ListItemButton>
              </a>
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
