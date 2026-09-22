
import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { cores } from '../constants/theme';

export default function ConfirmacaoScreen({
  carrinho,
  total,
  endereco,
  formaPagamento,
  precisoDeTroco,
  trocoPara,
  onNovoPedido,
}) {
  // Gera um número aleatório para o pedido
  const [numeroPedido] = useState(
    Math.floor(1000 + Math.random() * 9000)
  );

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Ícone de confirmação */}
        <View style={styles.checkCircle}>
          <Text style={styles.checkText}>
            ✓
          </Text>
        </View>

        {/* Título */}
        <Text style={styles.titulo}>
          Pedido confirmado!
        </Text>

        {/* Número do pedido */}
        <Text style={styles.numeroPedido}>
          Pedido #{numeroPedido}
        </Text>

        {/* Linha divisória */}
        <View style={styles.linha} />

        {/* Produtos do pedido */}
        <View style={styles.itensContainer}>

          {carrinho.map((item) => (
            <View
              key={item.id}
              style={styles.itemLinha}
            >
              <Text style={styles.itemQuantidade}>
                {item.quantidade}x
              </Text>

              <Text style={styles.itemNome}>
                {item.nome}
              </Text>
            </View>
          ))}

        </View>

        {/* Linha divisória */}
        <View style={styles.linha} />

        {/* Total pago */}
        <View style={styles.totalLinha}>

          <Text style={styles.totalLabel}>
            Total pago
          </Text>

          <Text style={styles.totalValor}>
            R$ {Number(total)
              .toFixed(2)
              .replace('.', ',')}
          </Text>

        </View>

        {/* Informações do pedido */}
        <View style={styles.infoContainer}>

          {/* Endereço */}
          <Text style={styles.infoTexto}>
            Entrega: {endereco?.rua}, {endereco?.numero}
          </Text>

          {/* Complemento */}
          {endereco?.complemento ? (
            <Text style={styles.infoTexto}>
              Complemento: {endereco.complemento}
            </Text>
          ) : null}

          {/* Referência */}
          {endereco?.referencia ? (
            <Text style={styles.infoTexto}>
              Referência: {endereco.referencia}
            </Text>
          ) : null}

          {/* Forma de pagamento */}
          <Text style={styles.infoTexto}>
            Pagamento: {formaPagamento}
          </Text>

          {/* Troco */}
          {formaPagamento === 'Dinheiro' &&
            precisoDeTroco &&
            trocoPara ? (
            <Text style={styles.infoTexto}>
              Troco para: R$ {String(trocoPara).replace('.', ',')}
            </Text>
          ) : null}

        </View>

      </ScrollView>

      {/* Rodapé */}
      <View style={styles.footer}>

        {/* Botão fazer novo pedido */}
        <TouchableOpacity
          style={styles.btnNovoPedido}
          activeOpacity={0.7}
          onPress={onNovoPedido}
        >
          <Text style={styles.btnNovoPedidoText}>
            Fazer novo pedido
          </Text>
        </TouchableOpacity>

        {/* Identificação da tela */}
        <Text style={styles.tagSubtitulo}>
          T4 • Confirmação
        </Text>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  // Tela inteira
  container: {
    flex: 1,
    backgroundColor: cores.branco,
  },

  // Conteúdo da tela
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },

  // Círculo verde de confirmação
  checkCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: cores.sucesso,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  checkText: {
    color: cores.branco,
    fontSize: 34,
    fontWeight: 'bold',
    lineHeight: 40,
  },

  // Título
  titulo: {
    textAlign: 'center',
    color: cores.escura,
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 2,
  },

  // Número do pedido
  numeroPedido: {
    textAlign: 'center',
    color: cores.primaria,
    fontSize: 13,
    marginTop: 3,
  },

  // Linha divisória
  linha: {
    height: 1,
    backgroundColor: '#E5E7EB',
    width: '100%',
    marginVertical: 12,
  },

  // Produtos
  itensContainer: {
    width: '100%',
  },

  itemLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },

  itemQuantidade: {
    color: cores.secundaria,
    fontSize: 13,
    width: 30,
  },

  itemNome: {
    color: cores.escura,
    fontSize: 13,
    flex: 1,
  },

  // Total
  totalLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 1,
  },

  totalLabel: {
    color: cores.escura,
    fontSize: 14,
    fontWeight: 'bold',
  },

  totalValor: {
    color: cores.sucesso,
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Informações
  infoContainer: {
    marginTop: 6,
  },

  infoTexto: {
    color: cores.secundaria,
    fontSize: 12,
    marginTop: 3,
  },

  // Rodapé
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: cores.branco,
  },

  // Botão verde
  btnNovoPedido: {
    backgroundColor: cores.sucesso,
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  btnNovoPedidoText: {
    color: cores.branco,
    fontSize: 13,
    fontWeight: 'bold',
  },

  // T4 verde
  tagSubtitulo: {
    color: cores.sucesso,
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },

});