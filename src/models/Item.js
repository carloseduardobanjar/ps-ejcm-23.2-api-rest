const DataTypes = require("sequelize")
const sequelize = require("../config/sequelize");

const Item = sequelize.define("Item", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }
}, {timestamps: true});

Item.associate = (models) => {
    Item.belongsTo(models.Vendor);
}

module.exports = Item;