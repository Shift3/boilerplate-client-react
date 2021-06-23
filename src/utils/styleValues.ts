import { Constants } from "./constants";

const footerHeight = '25px';
const topNavHeight = '150px';
const topNavMinPageHeight = `calc(100vh - ${topNavHeight} - ${footerHeight})`;
const sideNavMinPageHeight = `calc(100vh - ${footerHeight})`;
const minPageHeight = Constants.navPosition === "top" ? topNavMinPageHeight : sideNavMinPageHeight;

export default {
  adminBackground: '#f1f0eb',
  authBackground: '#ecf6f9',
  contentBackground: '#f1f0eb',
  userBackground: '#f1f0eb',
  primary: '#175f6e',
  primaryBorder: '#66bbcd',
  accent: '#d44325',
  accentBorder: '#d44325',
  accentDisabled: '#e78b78',
  cardHeader: '#c5e6ec',
  navBackground: '#ffffff',
  navLink: '#2B373B',
  clear: 'rgba(0, 0, 0, 0)',
  sideNavWidth: '20%',
  sideNavHeight: '100vh',
  navLogoOffset: '20px',
  footerHeight,
  topNavHeight,
  topNavMinPageHeight,
  sideNavMinPageHeight,
  minPageHeight
};