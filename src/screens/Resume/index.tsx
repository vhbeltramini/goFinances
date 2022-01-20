import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { useFocusEffect } from "@react-navigation/native";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { addMonths, format, subMonths } from "date-fns";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { 
    Container, 
    Header, 
    Title, 
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadContainer,
} from "./styles"


export interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}


export interface CategoryData {
    key: string;
    name: string;
    amount: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function Resume() {
    const [isLoading, setIsLoading] = useState(false);
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const theme = useTheme();

    function handleDateChange(actiton : 'next' | 'previous') {
        setIsLoading(true);
        if (actiton === 'next' ) {
            setSelectedDate(addMonths(selectedDate, 1));
        } else if (actiton === 'previous'){
            setSelectedDate(subMonths(selectedDate, 1));
        }

    }

    async function loadDataResume() {
        try {
            setIsLoading(true);
            const dataKey = '@goFinance:transactions';
            const response = await AsyncStorage.getItem(dataKey);
            const responseFormatted = response ? JSON.parse(response) : [];

            const expensives = responseFormatted
            .filter((exp: TransactionData) => 
                exp.type === 'negative' && 
                new Date(exp.date).getMonth() === selectedDate.getMonth() && 
                new Date(exp.date).getFullYear() === selectedDate.getFullYear() 
            );

            const expensivesTotal = expensives.reduce((acumulator : number, expensives : TransactionData) => {
                return acumulator += Number(expensives.amount);
            }, 0);

            const totalByCategory : CategoryData[]  = [];

            categories.forEach(category => {
                let categorySum = 0;
                expensives.forEach((exp: TransactionData) => {
                    if(exp.category === category.key) {
                        categorySum += Number(exp.amount);
                    }
                })
                if(categorySum > 0 ) {
                    const totalFormatted = categorySum.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });

                    const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

                    totalByCategory.push({
                        key: category.key,
                        name: category.name,
                        amount: categorySum,
                        color: category.color,
                        totalFormatted,
                        percent
                    });
                }
            
            });
            setTotalByCategories(totalByCategory);
            setIsLoading(false);

        } catch (error) {
            console.log('LogErrro :', error);
        }
    }

    useFocusEffect(useCallback(() => {
        loadDataResume();
    },[selectedDate]));

    return (
        <Container>
            <Header>
                <Title>
                    Resume By Category
                </Title>
            </Header>

            { 
            isLoading ?  
            <LoadContainer> 
                <ActivityIndicator
                    color={theme.colors.primary} 
                    size="large"
                /> 
            </LoadContainer>  
                
            :

                <Content
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ 
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight(),
                    }}
                >


                    <MonthSelect>
                        <MonthSelectButton onPress={() => handleDateChange('previous')} >
                            <MonthSelectIcon name="chevron-left" />
                        </MonthSelectButton>

                        <Month>
                            { format(selectedDate, 'MMMM, yyyy') }    
                        </Month>

                        <MonthSelectButton onPress={() => handleDateChange('next')} >
                            <MonthSelectIcon name="chevron-right" />
                        </MonthSelectButton>
                    </MonthSelect>

                    <ChartContainer>
                        <VictoryPie 
                            data={totalByCategories}
                            colorScale={totalByCategories.map(category => category.color)}
                            style={{ 
                                labels: { 
                                    fontSize: RFValue(18),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape,
                                }
                            }}
                            labelRadius={85}
                            x="percent"
                            y="amount"
                        
                        />
                    </ChartContainer>

                    {
                        totalByCategories.map(item => ( 
                            <HistoryCard 
                                key={item.key}
                                title={item.name}
                                amount={item.totalFormatted}
                                color={item.color}
                            />
                        ))
                    
                    }
                </Content>
                
            }
        </Container>
    );
}