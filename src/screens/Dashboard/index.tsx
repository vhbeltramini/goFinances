import React from "react";
import { HighlightCard } from "../../components/HighlightCard";

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
    Title
} from './styles';


export function Dashboard() {
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
                    <IconSignOff name="power" />
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
            </Transactions>

        </Container>
    );

}
