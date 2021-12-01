import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../../global/styles/theme';

export const Container = styled(TouchableOpacity)`
    width: 100%;
    background-color: ${({theme}) => theme.colors.secondary};
    font-family: ${({theme}) => theme.fonts.medium};
    border-radius: ${RFValue(5)}px;
    padding: ${RFValue(18)}px;
    align-items: center;
`;

export const Label = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.shape};
`;

