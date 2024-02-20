from database import db


class Cart(db.Model):
    __tablename__ = "tb_cart"
    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    # ForeignKey
    product_id = db.Column(db.Integer, db.ForeignKey("tb_product.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("tb_users.id"), nullable=False)

    def __repr__(self) -> str:
        return f"<Cart {self.id}> {self.user_id} {self.product_id} {self.size} {self.quantity}"

    def __init__(self, user_id, product_id, size, quantity) -> None:
        self.user_id = user_id
        self.product_id = product_id
        self.size = size
        self.quantity = quantity

    def to_json(self) -> dict:
        return {
            "id": self.id,
            "size": self.size,
            "quantity": self.quantity,
        }
