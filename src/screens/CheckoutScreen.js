import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { cores } from '../constants/theme';

export default function CheckoutScreen({
  onVoltar,
  onFinalizar,
}) {

  // ==========================================
  // ESTADOS
  // ==========================================

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');

  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [referencia, setReferencia] = useState('');

  const [pagamento, setPagamento] = useState('Cartão');
  const [precisoDeTroco, setPrecisoDeTroco] = useState(false);
  const [trocoPara, setTrocoPara] = useState('');


  // ==========================================
  // FORMATAR TELEFONE
  // ==========================================

  const formatarTelefone = (texto) => {

    const numeros = texto
      .replace(/\D/g, '')
      .slice(0, 11);

    if (numeros.length === 0) {
      return '';
    }

    if (numeros.length <= 2) {
      return `(${numeros}`;
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  };


  // ==========================================
  // FORMATAR CEP
  // ==========================================

  const formatarCep = (texto) => {

    const numeros = texto
      .replace(/\D/g, '')
      .slice(0, 8);

    if (numeros.length > 5) {
      return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
    }

    return numeros;
  };


  // ==========================================
  // FINALIZAR PEDIDO
  // ==========================================

  const finalizarPedido = () => {

    const cepNumeros = cep.replace(/\D/g, '');


    // ========================================
    // VALIDAÇÕES
    // ========================================

    if (!nome.trim()) {
      alert('Digite seu nome.');
      return;
    }

    if (!telefone.trim()) {
      alert('Digite seu telefone.');
      return;
    }

    if (!cep.trim()) {
      alert('Digite seu CEP.');
      return;
    }

    if (cepNumeros.length !== 8) {
      alert('O CEP deve ter 8 dígitos.');
      return;
    }

    if (!rua.trim()) {
      alert('Digite sua rua.');
      return;
    }

    if (!numero.trim()) {
      alert('Digite o número do endereço.');
      return;
    }

    // Complemento é opcional

    if (pagamento === 'Dinheiro' && precisoDeTroco) {

      const valorTroco = trocoPara.replace(',', '.');

      if (
        !trocoPara.trim() ||
        isNaN(Number(valorTroco)) ||
        Number(valorTroco) <= 0
      ) {
        alert('Digite um valor válido em "Troco para".');
        return;
      }
    }


    // ========================================
    // DADOS DO PEDIDO
    // ========================================

    const dados = {

      nome: nome,

      telefone: telefone,

      cep: cep,

      endereco: {
        rua: rua,
        numero: numero,
        complemento: complemento,
        referencia: referencia,
      },

      pagamento: pagamento,

      precisoDeTroco:
        pagamento === 'Dinheiro'
          ? precisoDeTroco
          : false,

      trocoPara:
        pagamento === 'Dinheiro' && precisoDeTroco
          ? trocoPara
          : '',
    };


    console.log('Dados do pedido:', dados);


    if (onFinalizar) {
      onFinalizar(dados);
    } else {
      alert('Pedido finalizado com sucesso!');
    }
  };


  // ==========================================
  // VERIFICAR CEP
  // ==========================================

  const cepInvalido =
    cep.length > 0 &&
    cep.replace(/\D/g, '').length !== 8;


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* =====================================
            CABEÇALHO
        ===================================== */}

        <TouchableOpacity
          style={styles.headerButton}
          onPress={onVoltar}
          activeOpacity={0.7}
        >

          <Text style={styles.headerButtonText}>
            ← Dados de Entrega
          </Text>

        </TouchableOpacity>


        {/* =====================================
            FORMULÁRIO
        ===================================== */}

        <View style={styles.formContainer}>


          {/* ==================================
              NOME
          ================================== */}

          <Text style={styles.label}>
            Nome *
          </Text>

          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            placeholderTextColor={cores.secundaria}
            keyboardType="default"
          />


          {/* ==================================
              TELEFONE
          ================================== */}

          <Text style={styles.label}>
            Telefone *
          </Text>

          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={(texto) => {
              setTelefone(formatarTelefone(texto));
            }}
            placeholder="(19) 99999-9999"
            placeholderTextColor={cores.secundaria}
            keyboardType="phone-pad"
            maxLength={15}
          />


          {/* ==================================
              CEP
          ================================== */}

          <Text style={styles.label}>
            CEP *
          </Text>

          <TextInput
            style={[
              styles.input,
              cepInvalido && styles.inputErro,
            ]}
            value={cep}
            onChangeText={(texto) => {
              setCep(formatarCep(texto));
            }}
            placeholder="00000-000"
            placeholderTextColor={cores.secundaria}
            keyboardType="numeric"
            maxLength={9}
          />

          {cepInvalido && (

            <Text style={styles.erroTexto}>
              ⚠ CEP deve ter 8 dígitos.
            </Text>

          )}


          {/* ==================================
              ENDEREÇO
          ================================== */}

          <Text style={styles.secaoTitulo}>
            Endereço
          </Text>


          {/* ==================================
              RUA
          ================================== */}

          <Text style={styles.label}>
            Rua *
          </Text>

          <TextInput
            style={styles.input}
            value={rua}
            onChangeText={setRua}
            placeholder="Nome da rua"
            placeholderTextColor={cores.secundaria}
            keyboardType="default"
          />


          {/* ==================================
              NÚMERO
          ================================== */}

          <Text style={styles.label}>
            Número *
          </Text>

          <TextInput
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
            placeholder="Número"
            placeholderTextColor={cores.secundaria}
            keyboardType="numeric"
          />


          {/* ==================================
              COMPLEMENTO
          ================================== */}

          <Text style={styles.label}>
            Complemento (opcional)
          </Text>

          <TextInput
            style={styles.input}
            value={complemento}
            onChangeText={setComplemento}
            placeholder="Apartamento, bloco, casa, etc."
            placeholderTextColor={cores.secundaria}
            keyboardType="default"
          />


          {/* ==================================
              PONTO DE REFERÊNCIA
          ================================== */}

          <Text style={styles.label}>
            Ponto de referência
          </Text>

          <TextInput
            style={styles.input}
            value={referencia}
            onChangeText={setReferencia}
            placeholder="Ex: próximo ao mercado"
            placeholderTextColor={cores.secundaria}
            keyboardType="default"
          />


          {/* ==================================
              PAGAMENTO
          ================================== */}

          <Text style={styles.label}>
            Forma de pagamento *
          </Text>

          <View style={styles.pickerContainer}>

            <Picker
              selectedValue={pagamento}
              onValueChange={(itemValue) => {

                setPagamento(itemValue);

                if (itemValue !== 'Dinheiro') {
                  setPrecisoDeTroco(false);
                  setTrocoPara('');
                }

              }}
              style={styles.picker}
            >

              <Picker.Item
                label="Cartão"
                value="Cartão"
              />

              <Picker.Item
                label="Pix"
                value="Pix"
              />

              <Picker.Item
                label="Dinheiro"
                value="Dinheiro"
              />

            </Picker>

          </View>


          {/* ==================================
              TROCO
          ================================== */}

          {pagamento === 'Dinheiro' && (

            <View style={styles.trocoContainer}>

              <View style={styles.switchRow}>

                <Text style={styles.labelSwitch}>
                  Preciso de troco
                </Text>

                <Switch
                  value={precisoDeTroco}
                  onValueChange={setPrecisoDeTroco}
                />

              </View>


              {precisoDeTroco && (

                <TextInput
                  style={styles.input}
                  value={trocoPara}
                  onChangeText={(texto) => {
                    setTrocoPara(
                      texto.replace(/[^0-9,.]/g, '')
                    );
                  }}
                  placeholder="Troco para (ex: 50,00)"
                  placeholderTextColor={cores.secundaria}
                  keyboardType="numeric"
                />

              )}

            </View>

          )}

        </View>


        {/* =====================================
            BOTÃO FINALIZAR
        ===================================== */}

        <View style={styles.footer}>

          <TouchableOpacity
            style={styles.btnFinalizar}
            onPress={finalizarPedido}
            activeOpacity={0.7}
          >

            <Text style={styles.btnFinalizarTexto}>
              Finalizar pedido
            </Text>

          </TouchableOpacity>


          <Text style={styles.tagSubtitulo}>
            T3 • Checkout
          </Text>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  // ==========================================
  // CONTAINER
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: cores.branco,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },


  // ==========================================
  // CABEÇALHO
  // ==========================================

  headerButton: {
    backgroundColor: cores.primaria,
    margin: 16,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'stretch',
  },

  headerButtonText: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: 'bold',
  },


  // ==========================================
  // FORMULÁRIO
  // ==========================================

  formContainer: {
    paddingHorizontal: 16,
  },

  secaoTitulo: {
    color: cores.escura,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 7,
    marginBottom: 2,
  },

  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: cores.escura,
    marginBottom: 5,
    marginTop: 5,
  },

  input: {
    height: 40,
    borderWidth: 1,
    borderColor: cores.secundaria,
    borderRadius: 9,
    paddingHorizontal: 10,
    fontSize: 14,
    color: cores.escura,
    backgroundColor: cores.branco,
    marginBottom: 7,
  },

  inputErro: {
    borderColor: cores.erro,
    backgroundColor: cores.branco,
  },

  erroTexto: {
    color: cores.erro,
    fontSize: 11,
    marginTop: -3,
    marginBottom: 5,
  },


  // ==========================================
  // PICKER
  // ==========================================

  pickerContainer: {
    height: 48,
    borderWidth: 1,
    borderColor: cores.secundaria,
    borderRadius: 9,
    backgroundColor: cores.branco,
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 7,
  },

  picker: {
    height: 48,
    color: cores.escura,
  },


  // ==========================================
  // TROCO
  // ==========================================

  trocoContainer: {
    marginTop: 2,
  },

  switchRow: {
    minHeight: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  labelSwitch: {
    fontSize: 13,
    fontWeight: 'bold',
    color: cores.escura,
  },


  // ==========================================
  // RODAPÉ
  // ==========================================

  footer: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingTop: 8,
    alignItems: 'center',
  },

  btnFinalizar: {
    backgroundColor: cores.primaria,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  btnFinalizarTexto: {
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
