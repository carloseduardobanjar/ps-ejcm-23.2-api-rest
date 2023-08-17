const DataTypes = require("sequelize")
const sequelize = require("../config/sequelize");

const Vendor = sequelize.define("Vendor", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hash: {
		type: DataTypes.STRING,
	},
	salt: {
		type: DataTypes.STRING
	},
}, {timestamps: true});

Vendor.associate = (models) => {
    Vendor.hasMany(models.Item);
}

module.exports = Vendor;