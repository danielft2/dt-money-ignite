import { useState } from 'react'
import logo from '../../assets/logo.svg'
import Modal from 'react-modal';
import { Container, Content } from './style'

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
    return (
        <Container>
            <Content>
                <img src={logo} alt="dtmoney" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova Transação
                </button>
            </Content>
        </Container>
    )
}