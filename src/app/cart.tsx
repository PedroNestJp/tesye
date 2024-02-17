import { useState } from "react";
import { Text, View, ScrollView, Linking } from "react-native";
import { FormatCurrency } from "@/utils/functions/function-currency";

import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/linkButton";
import ModalCustom from "@/components/modal";
import ModalAlert from "@/components/modalAlert";
import { useAlert } from '@/context/AlertContext'
import { Alert } from '@/components/Alert'


const NUMERO_D0_ESTABELECIMENTO = "558386377109"

export default function Cart() {
    const [address, setAddress] = useState('')
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
    const { showAlert } = useAlert()

    const cartStore = useCartStore()
    const total = FormatCurrency(cartStore.products.reduce((total, product) =>
        total + product.price * product.quantity, 0))

    function handleDeletItem(product: ProductCartProps) {
        // Alert.alert("Remover", `Deseja remover 1und do ${product.title} ?`, [
        //     {
        //         text: "Remover",
        //         onPress: () => cartStore.remove(product.id),
        //     },
        //     {
        //         text: "Cancelar"
        //     }
        // ])

    }

    function Order() {
        if (address.trim().length === 0) {
            return(
                showAlert('teste')
                
                )
                
                
            }
            console.log(Order)
        const Products = cartStore.products.map((product) =>
            `\n ${product.quantity} ${product.title}`).join('')
        // console.log(Products)

        const message = `
        🍔 NOVO PEDIDO 
        \n 🛵 Entregar em: ${address}
        \n Itens : ${Products}
        \n 💰 Valor total: ${total}`


        // Alert.alert('Pedido enviado com sucesso ✅')
        Linking.openURL(
            `http://api.whatsapp.com/send?phone=${NUMERO_D0_ESTABELECIMENTO}&text=${message}`
        )
        cartStore.clear()
        navigation.goBack()
    }

    return (
        <View className="flex-1 ">
            <Header title="Carrinho" />

            <KeyboardAwareScrollView>
                <ScrollView>

                    {cartStore.products.length > 0 ?
                        <View className="flex-1 p-4 border-slate-400 border-b">
                            {cartStore.products.map((product) => (
                                <Product
                                    data={product}
                                    key={product.id}
                                    onPress={() => { handleDeletItem(product) }} />
                            ))}
                        </View>
                        :
                        <Text
                            className="p-8 font-body text-slate-400 text-lg text-center">
                            Adicione itens ao seu pedido
                        </Text>
                    }

                    <View className="p-4">
                        <View className="flex-row items-center mt-4 mb-4 ">
                            <Text className="text-white text-xl font-subTitle "> Total:</Text>
                            <Text className=" text-2xl text-lime-400 font-heading">{total}</Text>
                        </View>
                        <Input
                            className="mb-4"
                            placeholder="informações de entrega. Informe : bairro, rua e número   "
                            onChangeText={setAddress}
                            onSubmitEditing={Order}
                            blurOnSubmit
                            returnKeyType="next" />

                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

            <View className="p-4">
                <Button
                    className=""
                    onPress={Order}>
                    <Button.Text> Enviar Pedido </Button.Text>
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={25} />
                    </Button.Icon>
                </Button>
                <LinkButton title="Voltar ao cardápio" href="/">  </LinkButton>
            </View>
            {modalVisible && (
                <ModalCustom
                    modalMessage={('Pedido, informe o endereço de entrega')}
                    onRequestClose={() => setModalVisible(false)} />
            )}

        </View>
    )
}