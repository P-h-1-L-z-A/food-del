import mongoose from "mongoose"

const closedOrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    comments: { type: String, default: "" },
    closedDate: { type: Date, default: Date.now }
})

const closedOrderModel = mongoose.models.closedOrder || mongoose.model("closedOrder", closedOrderSchema)
export default closedOrderModel;
