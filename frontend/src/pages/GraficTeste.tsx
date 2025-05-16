import Header from '../components/Header/header';
import Tabela from '../components/GraficoNew/Table';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 20px;
    padding: 20px;
    font-size: 20px;
`;

export default function WeatherTable(){
  return (
    <Container>
      <Header/>
      <Tabela/>
    </Container>
  );
}