/* eslint-disable prettier/prettier */
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { NewChurrasModal } from '../../components/NewChurrasModal'
import styled from 'styled-components';

interface AddChurrasCardProps {
  date: string;
  description: string;
}

const Card = styled.div`
  width: calc(33.3333% - 1rem);
  margin-right: 1rem;
  margin-bottom: 1.5rem;
  background: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 1.25rem;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:nth-child(3n) {
    margin-right: 0;
  }
`;

const DateLine = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const DescriptionLine = styled.div`
  margin-bottom: 0.5rem;
`;

const AddChurrasCard: React.FC<AddChurrasCardProps> = ({
  date,
  description,
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Card>
          <DateLine>{date}</DateLine>
          <DescriptionLine>{description}</DescriptionLine>      
        </Card>
      </Dialog.Trigger>

      <NewChurrasModal />
    </Dialog.Root>
    
  );
};

export default AddChurrasCard;