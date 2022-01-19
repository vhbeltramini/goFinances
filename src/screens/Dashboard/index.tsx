import React from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import { 
    Container,
    Header,
    UserContainer,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    IconSignOff,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [
    {
        id: '1',
        type: 'positive',
        title:"Desenvolvimento de site",
        amount:"R$ 12.000,00",
        category: {
            name:'Vendas',
            icon:'dollar-sign'
        },
        date:"13/10/2020"
    },
    {
        id: '2',
        type: 'positive',
        title:"Salário",
        amount:"R$ 20.000,00",
        category: {
            name:'Salário',
            icon:'dollar-sign'
        },
        date:"13/10/2020"
    },
    {
        id: '3',
        type: 'negative',
        title:"Comida",
        amount:"R$ 2.000,00",
        category: {
            name:'Alimentação',
            icon:'coffee'
        },
        date:"13/10/2020"
    },
    {
        id: '4',
        type: 'negative',
        title:"Apartamento alugel",
        amount:"R$ 2.400,00",
        category: {
            name:'Casa',
            icon:'home'
        },
        date:"13/10/2020"
    }
];

    return (
        <Container>
            <Header>
                <UserContainer>
                    <UserInfo>
                        <Photo source={{uri: 'https://avatars.githubusercontent.com/u/55711918?v=4'}} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Victor</UserName>
                        </User>
                    </UserInfo>

                    <LogoutButton onPress={() => {}}>
                        <IconSignOff name="power" />
                    </LogoutButton>
                </UserContainer>
            </Header>

            <HighlightCards>
                <HighlightCard 
                    title="Entradas" 
                    amount="R$ 17.400,00" 
                    lastTransaction="Última entrada dia 11 de outubro" 
                    type="up"
                />
                <HighlightCard 
                    title="Saídas" 
                    amount="R$ 1.259,00" 
                    lastTransaction="Última saida dia 03 de outubro" 
                    type="down"
                />
                <HighlightCard 
                    title="Total" 
                    amount="R$ 16.141,00" 
                    lastTransaction="01 a 16 de abril" 
                    type="total"
                />
            </HighlightCards>
            
            <Transactions> 
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                 />
            </Transactions>

        </Container>
    );

}
