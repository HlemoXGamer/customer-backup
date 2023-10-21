<template>
    <div class="success-container">
        <div class="success-container-text">
            <p>{{ $t('checkout.payment.thanks_for_buying') }}</p>
            <p>{{ $t('checkout.payment.redirect') }}</p>
        </div>
        <svg width="70" height="70" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#65382c">
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2">
                    <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"/>
                    </path>
                </g>
            </g>
        </svg>
    </div>
</template>
<script>
import { show } from '~/apis/orders';
export default {
    layout: "payment",
    data() {
        return {
            order_id: this.$router.currentRoute.query.id,
            total_value: 0,
            currency: "KWD",
            items: []
        }
    },
    methods: {
        getOrderDetails(){
            show(this.order_id).then(({data}) => {
                this.total_value = data.total;
                    data.products.forEach((item, index) => {
                        this.items.push({
                            item_id: item.id,
                            item_name: item.name_en,
                            item_code: item.code,
                            price: item.price,
                            quantity: item.quantity,
                            index
                        })
                        
                    })
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.gaPurchase();
                this.fbPurchase();
            })
        },
        gaPurchase(){
            gtag("event", "purchase", {
                transaction_id: this.order_id,
                value: this.total_value,
                tax: 0,
                shipping: 0.500,
                currency: this.currency,
                coupon: "",
                items: [...this.items]
            });

            setTimeout(() => {
                this.$router.push(`/profile/orders/${this.order_id}/track`)
            }, 5000)
        },
        fbPurchase(){
            fbq('track', 'Purchase', {currency: this.currency, value: this.total_value});
        }
    },
    mounted(){
        this.getOrderDetails();
    }
}
</script>


<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=PT+Sans&display=swap');
    .success-container{
        font-family: "Readex Pro", sans-serif !important;
        width: 100vw;
        height: 100vh;
        background-color: #fff;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        .success-container-text{
            margin-bottom: 25px;
            p{
                color: #65382c;
                text-align: center;
                font-weight: bold;
                
                &:first-child{
                    font-size: 60px;
                }

                &:last-child{
                    font-size: 27px;
                    margin-top: 20px;
                }
            }
        }
}
</style>