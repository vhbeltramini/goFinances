import styled, { css } from "styled-components/native";
import {  RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
    color: string;
}

export const Container = styled.View<ContainerProps>`
    background-color: ${({theme}) => theme.colors.shape};
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 5px;
    border-left-width: 5px;
    border-left-color: ${({color}) => color };
    margin-right:  ${RFValue(16)}px;
    margin-bottom: ${RFValue(8)}px;
    padding: ${RFValue(13)}px ${RFValue(24)}px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size:  ${RFValue(15)}px;
`;

export const Amount = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size:  ${RFValue(15)}px;

`;
