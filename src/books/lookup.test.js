import { test, expect } from 'vitest';
import { lookupBookByIdDomain } from './lookup.js';
import { getBookDatabase } from '../database_access.js';
test('lookupBookByIdDomain returns a book when it exists', async () => {
    const { books } = await getBookDatabase();
    await books.insertOne({
        id: '123',
        name: 'Test Book',
        author: 'Test Author',
        description: 'running test for this',
        price: 10,
        stock: 5,
        image: 'image.png',
    });
    const result = await lookupBookByIdDomain('123');
    expect(result.id).toBe('123');
    expect(result.name).toBe('Test Book');
    expect(result.author).toBe('Test Author');
});
