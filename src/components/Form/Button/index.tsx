import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
    Container,
    Label
} from './styles'

interface Props extends TouchableOpacityProps {
    label: string;
}


export function Button({ label, ...rest }: Props) {
    return (
        <Container {...rest} >
            <Label>
                { label }
            </Label>
        </Container>
    );
}