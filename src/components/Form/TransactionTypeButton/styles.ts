import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../../global/styles/theme';
import { Feather } from "@expo/vector-icons";
import { RectButton } from 'react-native-gesture-handler';

interface IconsProps {
    isActive: boolean;
    type: 'up' | 'down';
}

export const Container = styled.View<IconsProps>`
    width: 48%;
    border-radius: ${RFValue(5)}px;
    border-style: solid;
    border-color: ${({theme}) => theme.colors.text};

    ${({ isActive, type }) => isActive && type === 'up' && css`
        background-color: ${({theme}) => theme.colors.success_light };
    `};
    
    ${({ isActive, type }) => isActive && type === 'down' && css`
        background-color: ${({theme}) => theme.colors.attention_light };
    `};
`;

export const Icon = styled(Feather)<IconsProps>`
    font-size: ${RFValue(24)}px;
    margin-right: ${RFValue(12)}px;
    color: ${({theme, type}) => 
        type === 'up' ? theme.colors.success : theme.colors.attention 
    }
`;

export const Title = styled.Text`
    font-size:  ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: ${RFValue(16)}px ${RFValue(16)}px;
`;