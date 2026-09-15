import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { cores } from '../constants/theme';

export default function CarrinhoScreen({
  carrinho,
  onAdicionar,
  onRemover,
  onVoltar,
}) {

  const TAXA_ENTREGA = 6.0;

  const subtotal = carrinho.reduce(
    (acc, item) =>
      acc + item.preco * item.quantidade,
    0
  );

  const total =
    subtotal +
    (carrinho.length > 0 ? TAXA_ENTREGA : 0);


  return (
    <SafeAreaView style={styles.container}>

      {/* Botão de voltar */}
      <TouchableOpacity
        style={styles.headerButton}
        onPress={onVoltar}
      >
        <Text style={styles.headerButtonText}>
          ← Meu Carrinho
        </Text>
      </TouchableOpacity>


      <ScrollView
        contentContainerStyle={styles.scrollContent}
      >

        {/* Carrinho vazio */}
        {carrinho.length === 0 ? (
          <Text style={styles.emptyText}>
            Seu carrinho está vazio.
          </Text>
        ) : (
          carrinho.map((item) => (
            <View
              key={item.id}
              style={styles.itemContainer}
            >
              {/* Informações do produto */}
              <View style={styles.itemInfo}>
                <Text style={styles.itemNome}>
                  {item.nome}
                </Text>
                <Text style={styles.itemPrecoUnitario}>
                  R$ {item.preco.toFixed(2).replace('.', ',')}
                </Text>
              </View>

              {/* Controles de quantidade */}
              <View style={styles.acoesContainer}>
                <View style={styles.contador}>
                  {/* Botão diminuir */}
                  <TouchableOpacity
                    style={styles.btnContador}
                    onPress={() => onRemover(item.id)}
                  >
                    <Text style={styles.btnContadorText}>
                      -
                    </Text>
                  </TouchableOpacity>

                  {/* Quantidade */}
                  <Text style={styles.qtdText}>
                    {item.quantidade}
                  </Text>

                  {/* Botão aumentar */}
                  <TouchableOpacity
                    style={styles.btnContador}
                    onPress={() => onAdicionar(item)}
                  >
                    <Text style={styles.btnContadorText}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Preço total do item */}
                <Text style={styles.itemPrecoTotal}>
                  R$ {(item.preco * item.quantidade)
                    .toFixed(2)
                    .replace('.', ',')}
                </Text>
              </View>
            </View>
          ))
        )}

      </ScrollView>


      {/* Footer contendo o Resumo da compra e o Botão Continuar */}
      {carrinho.length > 0 && (
        <View style={styles.footer}>

          {/* Resumo da compra */}
          <View style={styles.resumoCard}>
            {/* Subtotal */}
            <View style={styles.resumoLinha}>
              <Text style={styles.resumoLabel}>
                Subtotal
              </Text>
              <Text style={styles.resumoValor}>
                R$ {subtotal
                  .toFixed(2)
                  .replace('.', ',')}
              </Text>
            </View>

            {/* Entrega */}
            <View style={styles.resumoLinha}>
              <Text style={styles.resumoLabel}>
                Entrega
              </Text>
              <Text style={styles.resumoValor}>
                R$ {TAXA_ENTREGA
                  .toFixed(2)
                  .replace('.', ',')}
              </Text>
            </View>

            {/* Total */}
            <View style={styles.resumoLinha}>
              <Text style={styles.totalLabel}>
                TOTAL
              </Text>
              <Text style={styles.totalValor}>
                R$ {total
                  .toFixed(2)
                  .replace('.', ',')}
              </Text>
            </View>
          </View>

          {/* Botão continuar */}
          <TouchableOpacity
            style={styles.btnContinuar}
            activeOpacity={0.7}
          >
            <Text style={styles.btnContinuarText}>
              Continuar
            </Text>
          </TouchableOpacity>

          <Text style={styles.tagSubtitulo}>
            T2 • Carrinho
          </Text>

        </View>
      )}

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: cores.branco,
  },

  headerButton: {
    backgroundColor: cores.primaria,
    margin: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex', // Corrigido de 'flex' para 'flex-start' para evitar warning no RN
  },

  headerButtonText: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: 'bold',
  },

  scrollContent: {
    padding: 16,
  },

  emptyText: {
    textAlign: 'center',
    color: cores.secundaria,
    marginTop: 40,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  itemInfo: {
    flex: 1,
  },

  itemNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.escura,
  },

  itemPrecoUnitario: {
    fontSize: 13,
    color: cores.secundaria,
    marginTop: 2,
  },

  acoesContainer: {
    alignItems: 'flex-end',
  },

  contador: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  btnContador: {
    borderWidth: 1,
    borderColor: cores.primaria,
    borderRadius: 8,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnContadorText: {
    color: cores.primaria,
    fontSize: 16,
    fontWeight: 'bold',
  },

  qtdText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.escura,
  },

  itemPrecoTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.escura,
  },

  resumoCard: {
    backgroundColor: cores.fundoClaro,
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 12, // Espaço entre o card de resumo e o botão continuar
  },

  resumoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  resumoLabel: {
    color: cores.secundaria,
    fontSize: 14,
  },

  resumoValor: {
    color: cores.escura,
    fontSize: 14,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.escura,
    marginTop: 4,
  },

  totalValor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.sucesso,
    marginTop: 4,
  },

  footer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: cores.branco, // Opcional, garante fundo sólido embaixo
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },

  btnContinuar: {
    backgroundColor: cores.primaria,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  btnContinuarText: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: 'bold',
  },

  tagSubtitulo: {
    color: cores.primaria,
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },

});