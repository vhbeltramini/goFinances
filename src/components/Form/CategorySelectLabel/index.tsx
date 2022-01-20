import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { 
    Container,
    CategoryName,
    Icon
} from './styles'


interface Props extends RectButtonProps {
    title: string;
}


export function CategorySelectLabel({
    title,
    onPress
} : Props) {
    return (
        <Container onPress={onPress} >
            <CategoryName>
                {title}
            </CategoryName>
            <Icon name="chevron-down" />
        </Container>
    );
}