import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { 
    Container,
    Label
} from './styles'

interface Props extends RectButtonProps {
    label: string;
    onPress: () => void;
}


export function Button({ 
    label, 
    onPress,
    ...rest 
}: Props) {
    return (
        <Container 
            onPress={onPress}
            {...rest} 
        >
            <Label>
                { label }
            </Label>
        </Container>
    );
}