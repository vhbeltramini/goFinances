import React, { useEffect, useState } from "react";
import { 
    Alert, 
    Keyboard, 
    Modal, 
    TouchableWithoutFeedback 
} from "react-native";
import { useForm } from "react-hook-form";
import uuid from 'react-native-uuid';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup' 

import { Button } from "../../components/Form/Button";
import { CategorySelectLabel } from "../../components/Form/CategorySelectLabel";

import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { InputForm } from "../../components/InputForm";
import { CategorySelect } from "../CategorySelect";
import { 
    Container,
    Header,
    Title,
    Form,
    FormFields,
    TransactionsOptions
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface FormData {
    [name: string]: any;
}

const shema = Yup.object().shape({
    name: Yup.string().required('Please fill the Name field'),
    amount: Yup.number()
        .typeError('Informe a valid number')
        .positive('The value must be a positive')
        .required('Please fill the Value field')
});

const dataKey = '@goFinance:transactions';

export function Register() {

    const [transactionType, setTransactionType] = useState('');
    const [categorySelectModalOpen, setCategorySelectModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: "category",
        name: "Category"
    });

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(shema)
    });

    function handleTransactionTypeSelect( type: 'up' | 'down' ) {
        setTransactionType(type);
    }

    function handleCategorySelectModalOpen(ativa : boolean) {
        setCategorySelectModalOpen(ativa);
    }

    async function handleRegister(form: FormData) { 
        if(!transactionType) {
          return Alert.alert('Select the transaction type');
        }
    
        if(category.key === 'category') {
          return Alert.alert('Select a category');
        }
    
        const newTransaction = {
          id: String(uuid.v4()),
          name: form.name,
          amount: form.amount,
          transactionType,
          category: category.key,
          date: new Date()
        }

        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentTransactions = data ? JSON.parse(data) : [];

            const newTransactions = [
                ...currentTransactions,
                newTransaction
            ];
            await AsyncStorage.setItem(dataKey, JSON.stringify(newTransactions));

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Category'
            });
            navigation.navigate('Transactions'); //
        } catch (error) {
            console.log('LogErrro :', error);
        }
      }

    return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <Container>
            <Header>
                <Title>
                    Register
                </Title>
            </Header>

            <Form>
                <FormFields>
                    <InputForm
                        control={control}
                        name="name"
                        placeholder="Name"
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.name && errors.name.message} 
                    />
                    <InputForm
                        control={control}
                        name="amount"
                        keyboardType="numeric"
                        placeholder="Value"
                        error={errors.amount && errors.amount.message} 
                    />

                    <TransactionsOptions> 
                        <TransactionTypeButton
                            type="up"
                            title="Income"
                            onPress={() => handleTransactionTypeSelect('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton
                            type="down"
                            title="Outcome"
                            onPress={() => handleTransactionTypeSelect('down')}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionsOptions>
                    <CategorySelectLabel 
                        title={category.name}
                        onPress={() => handleCategorySelectModalOpen(true)}
                    />


                </FormFields>

                <Button 
                    label="Send"
                    onPress={handleSubmit(handleRegister)}
                />

            </Form>

            <Modal visible={categorySelectModalOpen}>
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeCategoryOptions={() => handleCategorySelectModalOpen(false)}
                />
            </Modal>
        </Container>    

    </TouchableWithoutFeedback>

    );
}