import styled from 'styled-components';
import { colors } from '../utils/colors';

const linkSvg = chrome.runtime.getURL('images/icon-link.svg');
export const Link = styled.a.attrs({ target: '_blank' })`
    display: inline-box;
    padding-right: 16px;
    color: ${colors.darkGrey};
    text-decoration: none;
    background-image: url(${linkSvg});
    background-repeat: no-repeat;
    background-position: right center;
    &:hover {
        color: ${colors.blue};
        text-decoration: underline;
    }
`;
