import React from "react";

import { RFValue } from 'react-native-responsive-fontsize';

import  AppleSvg  from "../../assets/apple-icon.svg";
import  GoogleSvg  from "../../assets/google-icon.svg";
import  LogoSvg  from "../../assets/app-start-logo.svg";


import { 
    Container,
    Header,
    TitleWrapper,
    SignInTitle,
    Title,
    Footer,
    FooterWrapper
} from "./styles";
import { SignInSocialButton } from "../../components/SignInSocialButton";


export function SignIn(){ 
    return(

        <Container>

            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(67)}
                    />

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça o seu login com {'\n'}
                    uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>

                <FooterWrapper>
                    <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} />
                    <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />

                </FooterWrapper>

            </Footer>
            
        </Container>

    );
}