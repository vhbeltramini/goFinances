import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import theme from "../../global/styles/theme";



export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background}
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary};

    width: 100%;
    height: ${RFValue(100)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    padding: ${RFValue(20)}px;
    justify-content: space-between;
`;

export const FormFields = styled.View`

`;

export const TransactionsOptions = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;