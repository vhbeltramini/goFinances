import React from "react";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { 
    Container,
    Header,
    Title,
    Form,
    FormFields,
    TransactionsOptions
} from "./styles";

export function Register() {
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
                        />
                        <TransactionTypeButton
                            type="down"
                            title="Outcome"
                        />
                    </TransactionsOptions>

                </FormFields>

                <Button label="Enviar" />

            </Form>
            
        </Container>
    );
}