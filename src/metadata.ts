/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./routes/auth/auth.dto"), { "LoginDto": { password: { required: true, type: () => String }, username: { required: true, type: () => String } }, "RegisterDto": { displayName: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./routes/users/users.dto"), { "CreateUserDto": { displayName: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, username: { required: true, type: () => String } }, "UpdateUserDto": {} }]], "controllers": [[import("./routes/app/app.controller"), { "AppController": { "index": {} } }], [import("./routes/auth/auth.controller"), { "AuthController": { "getMe": {}, "login": {}, "register": {} } }], [import("./routes/users/users.controller"), { "UsersController": { "create": {}, "findAll": {}, "findOne": {}, "remove": {}, "update": {} } }]] } };
};