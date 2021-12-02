import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Form/Button';
import { categories } from '../../utils/categories';
import { 
    Container,
    Header,
    Title,
    Category,
    Icon,
    CategoryName,
    Spacer,
    Footer,
} from './styles';

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeCategoryOptions: () => void;
}

export function CategorySelect({
    category,
    setCategory,
    closeCategoryOptions
} : Props) {
    return(
        <Container>
            <Header>
                <Title>
                    Categoria
                </Title>
            </Header>

            <FlatList
                data={categories}
                style={{ flex: 1, width: '100%'}}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => (
                    <Category
                        onPress={() => setCategory(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon} />
                        <CategoryName>{item.name}</CategoryName>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Spacer />}
            /> 

            <Footer>
                <Button label="Selecionar" onPress={closeCategoryOptions} >
                </Button>
            </Footer>

        </Container>
    );
}