import { DynamoDB } from 'aws-sdk';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { User } from '../models/user';

const dynamoDb = new DynamoDB.DocumentClient();

export const register = async (name: string, email: string, password: string): Promise<User> => {
    try {
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Save user to DynamoDB
        const user: User = {
            id:v4(),
            name,
            email,
            password: hashedPassword,
        };

        const params = {
            TableName: 'Users',
            Item: user,
        };
        const data  =await dynamoDb.put(params).promise();
        console.log(data);
        return user;
       
    } catch (error) {
        throw new Error('Internal Server Error');
    }
};

export const login = async (email: string, password: string): Promise<{ token: string }> => {
    try {
        // Retrieve user from DynamoDB
        const params = {
            TableName: 'Users',
            Key: {
                email:email,
            },
        };

        const result = await dynamoDb.get(params).promise();

        if (!result.Item) {
            throw new Error('Invalid credentials');
        }

        const user = result.Item as User;

        // Compare the password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Invalid credentials');
        }

        // Generate a JWT
        const token = jwt.sign({ email }, 'Deepthi', { expiresIn: '1h' });

        return { token };
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Failed to login');
    }

};
