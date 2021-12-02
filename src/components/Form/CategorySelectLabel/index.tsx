import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { 
    Container,
    CategoryName,
    Icon
} from './styles'


interface Props extends TouchableOpacityProps {
    title: string;
}


export function CategorySelectLabel({
    title,
    onPress,
    ...rest
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