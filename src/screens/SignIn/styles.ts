import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 70%;
    justify-content: flex-end;
    align-items: center;

    background-color: ${({theme}) => theme.colors.primary};

`;

export const TitleWrapper = styled.View`
    align-items: center;
`;

export const SignInTitle = styled.Text`
    text-align: center;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    margin-top: ${RFValue(70)}px; 
    margin-bottom: ${RFValue(70)}px;
`;

export const Title = styled.Text`
    margin-top: ${RFValue(40)}px; 
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(30)}px;
    text-align: center;
    color: ${({theme}) => theme.colors.shape};
`;

export const Footer = styled.View`
    width: 100%;
    height: 30%;

    background-color: ${({theme}) => theme.colors.secondary};

`;

export const FooterWrapper = styled.View`
    margin-top: ${RFValue(-10)}px;
    padding: 0 ${RFValue(32)}px;
    justify-content: space-between;
`;
