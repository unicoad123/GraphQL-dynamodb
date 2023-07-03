import { login, register } from '../controllers/authController';

export const resolvers = {
    Mutation: {
        register: (_, { name, email, password }: { name: string; email: string; password: string }) =>
            register(name, email, password),
        login: (_, { email, password }: { email: string; password: string }) => login(email, password),
    },
};
