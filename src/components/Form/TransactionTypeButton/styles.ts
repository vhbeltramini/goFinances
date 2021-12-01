import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../../global/styles/theme';
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';

interface IconsProps {
    type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1.5px solid  ${({theme}) => theme.colors.text};
    border-radius: ${RFValue(5)}px;
    padding: ${RFValue(16)}px ${RFValue(16)}px;

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