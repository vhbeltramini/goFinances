import React, { useCallback, useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "styled-components";

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
    LogoutButton,
    LoadContainer
} from './styles';
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { format } from "date-fns";

export interface DataListProps extends TransactionCardProps {
    id: string;
}


interface HighlightCardsProps {
    amount: string;
    lastTransaction: string;
}

interface HighlightCardsData {
    entries: HighlightCardsProps;
    outgoings: HighlightCardsProps;
    total: HighlightCardsProps;
}

export function Dashboard() {
    const [isLoading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightCardsData, setHighlightCardsData] = useState<HighlightCardsData>({} as HighlightCardsData);

    const theme = useTheme();

    function getLastTransactionDate(
        transactions: DataListProps[],
        type: 'positive' | 'negative'
    ) {
        const lastTransaction = new Date(
            Math.max.apply(
              Math,
              transactions
                .filter(transaction => transaction.type === type)
                .map(transaction => new Date(transaction.date).getTime()),
            ),
          );
        
            return ` ${lastTransaction.getDate()} of ${format(lastTransaction, 'MMMM')}`;
    }


    async function loadTransactions() {
        const dataKey = '@goFinance:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let outgoingTotal = 0;

        const transactionsFormated: DataListProps[] = transactions
        .map(( item: DataListProps )=> {

            if (item.type == 'positive') {
                entriesTotal += Number(item.amount);
            } else {
                outgoingTotal += Number(item.amount);
            }

            const amount = Number(item.amount)
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });
            const date = Intl.DateTimeFormat('en-US', { 
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));
            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
    });

        setTransactions(transactionsFormated);

        let lastTransactionEntries = ``;
        let lastTransactionOutgoing = ``;

        if (transactionsFormated.filter(transaction => transaction.type === 'positive').map(transaction => true)[0]) {
            lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
        } else if (transactionsFormated.filter(transaction => transaction.type === 'negative').map(transaction => true)[0]) {
            lastTransactionOutgoing = getLastTransactionDate(transactions, 'negative');
        }
        
        const totalInterval = `01 to${lastTransactionOutgoing}`;
        
        const total = entriesTotal - outgoingTotal;

        setHighlightCardsData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction:`Last entrie day${lastTransactionEntries}`,
            },
            outgoings: { 
                amount: outgoingTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction:`Last outgoing day${lastTransactionOutgoing}`,

            },
            total: { 
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction:totalInterval
            }

        });
        setLoading(false);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    },[]));

    return (
        <Container>
            { 
                isLoading ?  
                <LoadContainer> 
                    <ActivityIndicator
                        color={theme.colors.primary} 
                        size="large"
                    /> 
                </LoadContainer>  
                
                :
                
                <> 
                    <Header>
                        <UserContainer>
                            <UserInfo>
                                <Photo source={{uri: 'https://avatars.githubusercontent.com/u/55711918?v=4'}} />
                                <User>
                                    <UserGreeting>Hello,</UserGreeting>
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
                            title="Entries" 
                            amount={highlightCardsData.entries.amount} 
                            lastTransaction={highlightCardsData.entries.lastTransaction} 
                            type="up"
                        />
                        <HighlightCard 
                            title="Outgoings" 
                            amount={highlightCardsData.outgoings.amount} 
                            lastTransaction={highlightCardsData.outgoings.lastTransaction} 
                            type="down"
                        />
                        <HighlightCard 
                            title="Total" 
                            amount={highlightCardsData.total.amount} 
                            lastTransaction={highlightCardsData.total.lastTransaction} 
                            type="total"
                        />
                    </HighlightCards>
                    
                    <Transactions> 
                        <Title>Transactions History</Title>
                        <TransactionList
                            data={transactions}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <TransactionCard data={item} />}
                        />
                    </Transactions>
            </>
        }
        </Container>
    );

}
