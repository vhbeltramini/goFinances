import React, { useState } from "react";
import { Modal } from "react-native";

import { Button } from "../../components/Form/Button";
import { CategorySelectLabel } from "../../components/Form/CategorySelectLabel";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { 
    Container,
    Header,
    Title,
    Form,
    FormFields,
    TransactionsOptions
} from "./styles";

export function Register() {

    const [TransactionType, setTransactionType] = useState('');
    const [categorySelectModalOpen, setCategorySelectModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria"
    });

    function handleTransactionTypeSelect( type: 'up' | 'down' ) {
        setTransactionType(type);
    }

    function handleCategorySelectModalOpen(ativa : boolean) {
        setCategorySelectModalOpen(ativa);
    }

    return(
        <Container>
            <Header>
                <Title>
                    Cadastro
                </Title>
            </Header>

            <Form>
                <FormFields>
                    <Input
                        placeholder="Nome"
                    />
                    <Input
                        placeholder="Valor"
                    />

                    <TransactionsOptions> 
                        <TransactionTypeButton
                            type="up"
                            title="Income"
                            onPress={() => handleTransactionTypeSelect('up')}
                            isActive={TransactionType === 'up'}
                        />
                        <TransactionTypeButton
                            type="down"
                            title="Outcome"
                            onPress={() => handleTransactionTypeSelect('down')}
                            isActive={TransactionType === 'down'}
                        />
                    </TransactionsOptions>
                    <CategorySelectLabel 
                        title={category.name}
                        onPress={() => handleCategorySelectModalOpen(true)}
                    />


                </FormFields>

                <Button label="Enviar" />

            </Form>

            <Modal visible={categorySelectModalOpen}>
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeCategoryOptions={() => handleCategorySelectModalOpen(false)}
                />
            </Modal>
            
        </Container>
    );
}