"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var product_controller_1 = require("./product/product.controller");
var product_schema_1 = require("./product/product.schema");
var product_service_1 = require("./product/product.service");
var mongoose_1 = require("@nestjs/mongoose");
var config_1 = require("@nestjs/config");
var auth_module_1 = require("./auth/auth.module");
var users_module_1 = require("./users/users.module");
var users_model_1 = require("./users/users.model");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot(),
                mongoose_1.MongooseModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: function (configService) { return ({
                        uri: configService.get('MONGODB_URL')
                    }); },
                    inject: [config_1.ConfigService]
                }),
                mongoose_1.MongooseModule.forFeature([
                    { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                    { name: users_model_1.User.name, schema: users_model_1.UserSchema },
                ]),
                auth_module_1.AuthModule,
                users_module_1.UserModule,
            ],
            controllers: [product_controller_1.ProductController],
            providers: [product_service_1.ProductService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
