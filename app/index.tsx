import React, { useState } from 'react';

import CardapioScreen from '../src/screens/CardapioScreen';
import CarrinhoScreen from '../src/screens/CarrinhoScreen';
import CheckoutScreen from '../src/screens/CheckoutScreen';
import ConfirmacaoScreen from '../src/screens/ConfirmacaoScreen';

export default function Page() {
  const [carrinho, setCarrinho] = useState<any[]>([]);

  const [telaAtual, setTelaAtual] =
    useState<
      'CARDAPIO' | 'CARRINHO' | 'CHECKOUT' | 'CONFIRMACAO'
    >('CARDAPIO');

  const [dadosPedido, setDadosPedido] = useState<any>(null);

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

    setDadosPedido(dados);
    setTelaAtual('CONFIRMACAO');
  };

  const total = carrinho.reduce(
    (soma, item) =>
      soma + item.preco * item.quantidade,
    0
  );

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

      {telaAtual === 'CONFIRMACAO' && dadosPedido && (
        <ConfirmacaoScreen
          carrinho={carrinho}
          total={total}
          endereco={dadosPedido.endereco}
          formaPagamento={dadosPedido.pagamento}
          precisoDeTroco={dadosPedido.precisoDeTroco}
          trocoPara={dadosPedido.trocoPara}
          onNovoPedido={() => {
            setCarrinho([]);
            setDadosPedido(null);
            setTelaAtual('CARDAPIO');
          }}
        />
      )}
    </>
  );
}
