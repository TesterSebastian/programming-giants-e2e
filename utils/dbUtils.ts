import sql from 'mssql';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

export async function deleteByEmail(email: string): Promise<void> {
    const config = {
      user: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      server: process.env.DB_SERVER as string,
      port: parseInt(process.env.DB_PORT || '1433', 10),
      database: process.env.DB_DATABASE as string,
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
      },
    };
  
    try {
      const pool = await sql.connect(config);
      await pool.request()
        .input('email', sql.NVarChar, email)
        .query(`
          DELETE FROM AspNetUsers
          WHERE email = @email;
        `);
  
        console.log(`Record with email address '${email}' has been deleted.`);
    } catch (error) {
      console.error('Error occurred while deleting the record from the database:', error);
    } finally {
      await sql.close();
    }
}

export function getRandomEmail(firstName?: string, lastName?: string, provider?: string): string {
    const randomEmail = faker.internet.email({
      firstName: firstName,
      lastName: lastName,
      provider: provider,
    });
    return randomEmail;
}
