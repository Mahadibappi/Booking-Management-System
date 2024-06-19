"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
// Define the authentication middleware
const auth = (...roles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract the token from the Authorization header
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).send({ error: "User not authenticated" });
        }
        const token = authHeader.replace("Bearer ", "");
        if (!token) {
            return res.status(401).send({ error: "User not authenticated" });
        }
        try {
            // Verify the token and extract the payload
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            // Ensure the decoded token contains an id
            if (!decoded.id) {
                throw new Error("Invalid token: No user ID found");
            }
            // Find the user in the database by ID and access token
            const user = yield user_model_1.default.findOne({
                _id: decoded.id,
            });
            // If no user is found, throw an error
            if (!user) {
                throw new Error("User Not Exist");
            }
            const role = user === null || user === void 0 ? void 0 : user.role;
            if (roles && !roles.includes(role)) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "your are not authorized");
            }
            // Attach the token and user to the request object
            req.token = token;
            req.user = user;
            // set up role
            next();
        }
        catch (error) {
            throw new AppError_1.default(error.message, "Something went wrong!");
        }
    }));
};
exports.default = auth;
