import React, { useState } from 'react';
import CardapioScreen from './src/screens/CardapioScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';

export default function App() {
<<<<<<< HEAD
  const [telaAtual, setTelaAtual] = useState('CARDAPIO');
  const [carrinho, setCarrinho] = useState([]);

  // Adiciona produto e navega direto para a tela do carrinho
=======

  const [telaAtual, setTelaAtual] = useState('CARDAPIO');
  
  const [carrinho, setCarrinho] = useState([]);

>>>>>>> 4329bf136e0f159a7a70cd4d2402c3a82f4b274a
  const handleAdicionarProduto = (produto) => {
    setCarrinho((itensAnteriores) => {
      const itemExistente = itensAnteriores.find((item) => item.id === produto.id);
      if (itemExistente) {
        return itensAnteriores.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...itensAnteriores, { ...produto, quantidade: 1 }];
    });

    setTelaAtual('CARRINHO'); // Troca a tela para o carrinho ao clicar em Add
  };

<<<<<<< HEAD
  // Diminui a quantidade ou remove o item do carrinho
  const handleRemoverProduto = (idProduto) => {
    setCarrinho((itensAnteriores) => {
      return itensAnteriores
        .map((item) => {
          if (item.id === idProduto) {
            return { ...item, quantidade: item.quantidade - 1 };
          }
          return item;
        })
        .filter((item) => item.quantidade > 0);
    });
  };
=======
  return (
    <>
      {telaAtual === 'CARDAPIO' && (
        <CardapioScreen
          carrinho={carrinho}
          onAdicionarProduto={handleAdicionarProduto}
        />
      )}
    </>
  );
}
>>>>>>> 4329bf136e0f159a7a70cd4d2402c3a82f4b274a
