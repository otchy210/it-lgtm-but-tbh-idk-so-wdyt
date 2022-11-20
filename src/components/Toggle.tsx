import React, { useRef } from 'react';
import styled from 'styled-components';
import { colors } from '../utils/colors';

type CheckboxProps = {
    type: string;
};
const Checkbox = styled.input.attrs<CheckboxProps>({ type: 'checkbox' })`
    display: none;

    &:checked + label {
        background-color: ${colors.blue};
        transition: background-color 0.2s;
        & > span {
            left: 26px;
            transition: left 0.2s;
        }
    }
    & + label {
        background-color: ${colors.lightGrey};
        transition: background-color 0.2s;
        & > span {
            left: 2px;
            transition: left 0.2s;
        }
    }
`;

const Label = styled.label`
    display: inline-box;
    position: relative;
    border-radius: 24px;
    width: 48px;
    height: 24px;
    padding: 2px;
    cursor: pointer;
`;

const Circle = styled.span`
    display: inline-box;
    position: absolute;
    background-color: ${colors.white};
    width: 20px;
    height: 20px;
    border-radius: 50%;
`;

type Props = {
    id: string;
    checked: boolean;
    onClick: (checked: boolean) => void;
};

export const Toggle: React.FC<Props> = ({ id, checked, onClick }) => {
    const cbRef = useRef<HTMLInputElement>();
    const onCbClicked = () => {
        onClick(cbRef.current.checked);
    };
    return (
        <>
            <Checkbox id={id} name={id} checked={checked} onClick={onCbClicked} ref={cbRef} />
            <Label htmlFor={id}>
                <Circle />
            </Label>
        </>
    );
};
