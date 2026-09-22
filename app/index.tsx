import React, { useState } from 'react';

import CardapioScreen from '../src/screens/CardapioScreen';
import CarrinhoScreen from '../src/screens/CarrinhoScreen';
import CheckoutScreen from '../src/screens/CheckoutScreen';

export default function Page() {
  const [carrinho, setCarrinho] = useState<any[]>([]);

  const [telaAtual, setTelaAtual] =
    useState<'CARDAPIO' | 'CARRINHO' | 'CHECKOUT'>('CARDAPIO');

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
                quantidade: item.quantidade + 1,
              }
            : item
        );
      }

      return [
        ...itensAnteriores,
        {
          ...produto,
          quantidade: 1,
        },
      ];
    });

    setTelaAtual('CARRINHO');
  };

  const handleRemoverProduto = (idProduto: any) => {
    setCarrinho((itensAnteriores) =>
      itensAnteriores
        .map((item) =>
          item.id === idProduto
            ? {
                ...item,
                quantidade: item.quantidade - 1,
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const handleContinuar = () => {
    setTelaAtual('CHECKOUT');
  };

  const handleFinalizarPedido = (dados: any) => {
    console.log('Dados do pedido:', dados);
    console.log('Carrinho:', carrinho);
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
          onContinuar={handleContinuar}
        />
      )}

      {telaAtual === 'CHECKOUT' && (
        <CheckoutScreen
          onVoltar={() => setTelaAtual('CARRINHO')}
          onFinalizar={handleFinalizarPedido}
        />
      )}
    </>
  );
}
