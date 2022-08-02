import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

import { Container, RadioBox, TransactionTypeContainer } from './style';
import entradaImg from '../../assets/entrada.svg';
import saidaImg from '../../assets/saida.svg';
import closeImg from '../../assets/close.svg';
import Modal from 'react-modal';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    const [type, setType] = useState('deposit')

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
        await createTransaction({title, amount, category, type});

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose} 
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >   
            <button type='button' onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar Modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction} >
                <h2>Cadastrar transação</h2>

                <input 
                    placeholder='Título'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input 
                    type="number" 
                    placeholder='Valor'
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type='button'
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                      <img src={entradaImg} alt="Entrada" />
                      <span>Entrada</span>
                    </RadioBox>

                    <RadioBox 
                        type='button'
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                      <img src={saidaImg} alt="Saida" />
                      <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    placeholder='Categoria'
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </Container>  
        </Modal>
    )
}