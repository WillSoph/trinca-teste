/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';

interface ChurrasCardProps {
  date: string;
  description: string;
  participants: number;
  price: number;
  onClick: () => void;
}

const Card = styled.div`
  width: calc(33.3333% - 1rem);
  margin-right: 1rem;
  margin-bottom: 1.5rem;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-700']};
  border-radius: 6px;
  padding: 1.25rem;
  box-sizing: border-box;
  cursor: pointer;

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

const InfoLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Participants = styled.span`
  align-self: flex-start;
`;

const Price = styled.span`
  align-self: flex-end;
`;

const ChurrasCard: React.FC<ChurrasCardProps> = ({
  date,
  description,
  participants,
  price,
  onClick
}) => {
  return (
    <Card onClick={onClick}>
      <DateLine>{date}</DateLine>
      <DescriptionLine>{description}</DescriptionLine>
      <InfoLine>
        <Participants>{participants} participantes</Participants>
        <Price>R$ {price}</Price>
      </InfoLine>
    </Card>
  );
};

export default ChurrasCard;