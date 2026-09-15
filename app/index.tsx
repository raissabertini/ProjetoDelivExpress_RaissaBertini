import React, { useState } from 'react';

import CardapioScreen from '../src/screens/CardapioScreen';
import CarrinhoScreen from '../src/screens/CarrinhoScreen';

export default function Page() {

  const [carrinho, setCarrinho] = useState<any[]>([]);

  const [telaAtual, setTelaAtual] =
    useState<'CARDAPIO' | 'CARRINHO'>('CARDAPIO');


  // Adicionar produto ao carrinho
  const handleAdicionarProduto = (produto: any) => {

    setCarrinho((itensAnteriores) => {

      const itemExistente = itensAnteriores.find(
        (item) => item.id === produto.id
      );

      if (itemExistente) {

        return itensAnteriores.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1
              }
            : item
        );

      }

      return [
        ...itensAnteriores,
        {
          ...produto,
          quantidade: 1
        }
      ];

    });

    setTelaAtual('CARRINHO');
  };


  // Remover produto do carrinho
  const handleRemoverProduto = (idProduto: any) => {

    setCarrinho((itensAnteriores) =>
      itensAnteriores
        .map((item) =>
          item.id === idProduto
            ? {
                ...item,
                quantidade: item.quantidade - 1
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );

  };


  return (
    <>
      {telaAtual === 'CARDAPIO' && (
        <CardapioScreen
          carrinho={carrinho}
          onAdicionarProduto={handleAdicionarProduto}
        />
      )}

      {telaAtual === 'CARRINHO' && (
        <CarrinhoScreen
          carrinho={carrinho}
          onAdicionar={handleAdicionarProduto}
          onRemover={handleRemoverProduto}
          onVoltar={() => setTelaAtual('CARDAPIO')}
        />
      )}
    </>
  );
}