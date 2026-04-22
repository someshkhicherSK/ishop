const CartModel = require("../models/cart.model");

const cartController = {

    async moveToDb(req, res) {
        try {
            const { cart, userId } = req.body
            if (cart == null || cart.length == 0) {
                return res.status(200).json({ msg: "cart is found...", success: true, cart: await CartModel.find({ user_id: userId }).populate('product_id', 'originalPrice finalPrice') })
            }
            await Promise.all(
                cart.map(async (product) => {
                    const existingItem = await CartModel.findOne({ user_id: userId, product_id: product.productId })
                    if (existingItem) {
                        existingItem.qnty += Number(product.qnty);
                        await existingItem.save()
                    } else {
                        const updatecart = await CartModel.create({
                            user_id: userId,
                            product_id: product.productId,
                            qnty: product.qnty
                        })
                        await updatecart.save()
                    }
                })
            )
            res.status(200).json({ msg: "cart ok", success: true, cart: await CartModel.find({ user_id: userId }).populate('product_id', 'originalPrice finalPrice') })
        } catch (error) {
            console.log(error)
        }
    },
    async addToCart(req, res) {
        try {
            const { productId, userId } = req.body
            const existingItem = await CartModel.findOne({ user_id: userId, product_id: productId });
            if (existingItem) {
                existingItem.qnty += Number(1);
                await existingItem.save();
                return res.status(404).json({ msg: "Item quantity increased..", success: true })
            } else {
                const updatecart = await CartModel.create({
                    user_id: userId,
                    product_id: productId,
                    qnty: 1
                })
                await updatecart.save()
                return res.status(200).json({ msg: "Item added to cart successfully..", success: true })
            }
        } catch (error) {
            console.log(error)
            return res.status(501).json({ msg: "Internal Srver Error..", success: false })
        }
    },
    async removeToCart(req, res) {
        try {
            const { userId, productId } = req.params
            const existingItem = await CartModel.findOne({ user_id: userId, product_id: productId });
            if (!existingItem) return res.status(404).json({ msg: "Item not found in cart...", success: false })
            await CartModel.deleteOne({ user_id: userId, product_id: productId })
            return res.status(200).json({ msg: "Item removed from cart...", success: true })
        } catch (error) {
            console.log(error)
            return res.status(501).json({ msg: "Internal Srver Error..", success: false })
        }
    },
    async qntyHandel(req, res) {
        try {
            const { userId, productId, flag } = req.params
            console.log(userId, productId, flag)
            const existingItem = await CartModel.findOne({ user_id: userId, product_id: productId });
            if (!existingItem) return res.status(404).json({ msg: "Item not found in cart...", success: false });
            if (flag == "+") {
                existingItem.qnty += Number(1);
                await existingItem.save();
                return res.status(200).json({ msg: "Item quantity increased..", success: true })
            } else if (flag == "-") {
                existingItem.qnty -= Number(1)
                await existingItem.save();
                return res.status(200).json({ msg: "Item quantity decrease..", success: true })
            }
            
        } catch (error) {
            console.log(error)
        }
    },
}




module.exports = cartController;





