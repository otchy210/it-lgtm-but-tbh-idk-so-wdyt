import { createGlobalStyle } from 'styled-components';
import { colors } from '../utils/colors';

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    font-size: 10pt;
    font-family: sans-serif;
    color: ${colors.darkGrey};
}
* {
    box-sizing: border-box;
}`;

export default GlobalStyle;
